/* eslint-disable @typescript-eslint/no-explicit-any */
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "../schemas"
import { users, emailVerificationCodes, passwordResetTokens } from "../schemas"
import fs from "fs"
import path from "path"
import net from "net"

// File path for mock database
const DATA_DIR = path.join(process.cwd(), ".data")
const DB_FILE = path.join(DATA_DIR, "db.json")

function loadData() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(
        DB_FILE,
        JSON.stringify(
          {
            users: [],
            email_verification_codes: [],
            password_reset_tokens: [],
          },
          null,
          2
        )
      )
    }
    return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"))
  } catch (err) {
    console.error("Error loading mock db data:", err)
    return { users: [], email_verification_codes: [], password_reset_tokens: [] }
  }
}

function saveData(data: any) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2))
  } catch (err) {
    console.error("Error saving mock db data:", err)
  }
}

function getTableName(tableObj: any): string {
  if (tableObj === users) return "users"
  if (tableObj === emailVerificationCodes) return "email_verification_codes"
  if (tableObj === passwordResetTokens) return "password_reset_tokens"
  return tableObj[Symbol.for("drizzle:Name")] || tableObj.config?.name || "unknown"
}

// Extends conditions from a Drizzle query operator
function extractConditions(whereClause: any): Array<{ column: string; value: any; operator: string }> {
  const conditions: Array<{ column: string; value: any; operator: string }> = []

  function traverse(sqlObj: any) {
    if (!sqlObj) return

    if (sqlObj.queryChunks && Array.isArray(sqlObj.queryChunks)) {
      const chunks = sqlObj.queryChunks
      const isComparison = chunks.some(
        (c: any) => c && c.value && typeof c.value[0] === "string" && c.value[0].includes("=")
      )

      if (isComparison) {
        let columnName = ""
        let targetValue: any = null

        for (const chunk of chunks) {
          if (chunk && chunk.name) {
            columnName = chunk.name
          } else if (chunk !== null && (typeof chunk !== "object" || chunk instanceof Date)) {
            targetValue = chunk
          }
        }

        if (columnName) {
          conditions.push({ column: columnName, value: targetValue, operator: "=" })
          return
        }
      }

      for (const chunk of chunks) {
        if (chunk && typeof chunk === "object") {
          traverse(chunk)
        }
      }
    } else if (Array.isArray(sqlObj)) {
      for (const item of sqlObj) {
        traverse(item)
      }
    }
  }

  traverse(whereClause)
  return conditions
}

function recordMatches(record: any, conditions: Array<{ column: string; value: any; operator: string }>): boolean {
  if (conditions.length === 0) return true

  return conditions.every((cond) => {
    const recVal = record[cond.column]
    const searchVal = cond.value

    if (recVal === undefined) return false

    if (searchVal instanceof Date && recVal instanceof Date) {
      return recVal.getTime() === searchVal.getTime()
    }

    if (searchVal instanceof Date) {
      return new Date(recVal).getTime() === searchVal.getTime()
    }

    if (recVal instanceof Date) {
      return recVal.getTime() === new Date(searchVal).getTime()
    }

    // Handle stringified dates in JSON
    if (typeof recVal === "string" && searchVal instanceof Date) {
      return new Date(recVal).getTime() === searchVal.getTime()
    }

    return recVal === searchVal
  })
}

// In-Memory/JSON Mock Database implementation of Drizzle API
const mockDb = {
  query: {
    users: {
      findFirst: async (options: any) => {
        const data = loadData()
        const conds = options && options.where ? extractConditions(options.where) : []
        const found = data.users.find((u: any) => recordMatches(u, conds))
        return found || null
      },
    },
    emailVerificationCodes: {
      findFirst: async (options: any) => {
        const data = loadData()
        const conds = options && options.where ? extractConditions(options.where) : []
        const found = data.email_verification_codes.find((c: any) => recordMatches(c, conds))
        return found || null
      },
    },
    passwordResetTokens: {
      findFirst: async (options: any) => {
        const data = loadData()
        const conds = options && options.where ? extractConditions(options.where) : []
        const found = data.password_reset_tokens.find((t: any) => recordMatches(t, conds))
        return found || null
      },
    },
  },
  insert: (tableObj: any) => {
    const tableName = getTableName(tableObj)
    return {
      values: (valuesObj: any) => {
        const items = Array.isArray(valuesObj) ? valuesObj : [valuesObj]
        return {
          then: (resolve: any) => {
            const data = loadData()
            if (!data[tableName]) {
              data[tableName] = []
            }
            const preparedItems = items.map((item) => {
              const newItem = { ...item }
              for (const key of Object.keys(newItem)) {
                if (newItem[key] instanceof Date) {
                  newItem[key] = newItem[key].toISOString()
                }
              }
              return newItem
            })
            data[tableName].push(...preparedItems)
            saveData(data)
            if (resolve) resolve(preparedItems)
          },
        }
      },
    }
  },
  delete: (tableObj: any) => {
    const tableName = getTableName(tableObj)
    return {
      where: (whereClause: any) => {
        return {
          then: (resolve: any) => {
            const data = loadData()
            const conds = extractConditions(whereClause)
            const initialLength = data[tableName]?.length || 0
            if (data[tableName]) {
              data[tableName] = data[tableName].filter((item: any) => !recordMatches(item, conds))
            }
            saveData(data)
            if (resolve) resolve({ rowsAffected: initialLength - (data[tableName]?.length || 0) })
          },
        }
      },
    }
  },
  update: (tableObj: any) => {
    const tableName = getTableName(tableObj)
    return {
      set: (updateData: any) => {
        return {
          where: (whereClause: any) => {
            return {
              then: (resolve: any) => {
                const data = loadData()
                const conds = extractConditions(whereClause)
                let count = 0
                if (data[tableName]) {
                  data[tableName] = data[tableName].map((item: any) => {
                    if (recordMatches(item, conds)) {
                      count++
                      const updated = { ...item, ...updateData }
                      for (const key of Object.keys(updated)) {
                        if (updated[key] instanceof Date) {
                          updated[key] = updated[key].toISOString()
                        }
                      }
                      return updated
                    }
                    return item
                  })
                }
                saveData(data)
                if (resolve) resolve({ rowsAffected: count })
              },
            }
          },
        }
      },
    }
  },
}

// Connection check function
function checkConnection(host: string, port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = new net.Socket()
    socket.setTimeout(800)
    socket.on("connect", () => {
      socket.destroy()
      resolve(true)
    })
    socket.on("timeout", () => {
      socket.destroy()
      resolve(false)
    })
    socket.on("error", () => {
      resolve(false)
    })
    socket.connect(port, host)
  })
}

const connectionString = process.env.DATABASE_URL
let dbInstance: any
let useMock = !connectionString

if (connectionString) {
  try {
    const client = postgres(connectionString, {
      max: 10,
      connect_timeout: 3,
    } as any)
    dbInstance = drizzle(client, { schema })

    // Check database connection asynchronously
    const url = new URL(connectionString)
    const host = url.hostname || "localhost"
    const port = parseInt(url.port || "5432", 10)

    checkConnection(host, port).then((isAlive) => {
      if (!isAlive) {
        console.warn(`⚠️ PostgreSQL database at ${host}:${port} is offline. Falling back to local persistent Mock Database.`)
        useMock = true
      } else {
        console.log(`✅ Connected to PostgreSQL database at ${host}:${port}`)
      }
    })
  } catch {
    useMock = true
  }
}

// Intercept queries and reroute to mock database if needed
const queryProxy = new Proxy(
  {} as any,
  {
    get(target, table) {
      return new Proxy(
        {} as any,
        {
          get(target2, method) {
            return async function (...args: any[]) {
              if (useMock) {
                return (mockDb.query as any)[table][method](...args)
              }
              try {
                return await (dbInstance.query as any)[table][method](...args)
              } catch (err: any) {
                console.warn(`⚠️ PostgreSQL query failed. Falling back to local Mock Database:`, err.message)
                useMock = true
                return (mockDb.query as any)[table][method](...args)
              }
            }
          },
        }
      )
    },
  }
)

export const db = new Proxy(
  {} as any,
  {
    get(target, prop) {
      if (prop === "query") {
        return queryProxy
      }

      if (useMock) {
        return mockDb[prop as keyof typeof mockDb]
      }

      try {
        const val = dbInstance[prop]
        if (typeof val === "function") {
          return function (this: any, ...args: any[]) {
            try {
              const result = val.apply(this, args)
              if (result && typeof result.then === "function") {
                const originalThen = result.then
                result.then = function (onfulfilled: any, onrejected: any) {
                  return originalThen.call(result, onfulfilled, (err: any) => {
                    console.warn(`⚠️ PostgreSQL query failed. Falling back to local Mock Database:`, err.message)
                    useMock = true
                    const mockResult = (mockDb as any)[prop](...args)
                    if (mockResult && typeof mockResult.then === "function") {
                      return mockResult.then(onfulfilled, onrejected)
                    }
                    if (onfulfilled) return onfulfilled(mockResult)
                  })
                }

                if (typeof result.catch === "function") {
                  const originalCatch = result.catch
                  result.catch = function (onrejected: any) {
                    return originalCatch.call(result, (err: any) => {
                      console.warn(`⚠️ PostgreSQL query failed. Falling back to local Mock Database:`, err.message)
                      useMock = true
                      const mockResult = (mockDb as any)[prop](...args)
                      if (mockResult && typeof mockResult.catch === "function") {
                        return mockResult.catch(onrejected)
                      }
                      if (onrejected) return onrejected(err)
                    })
                  }
                }
              }
              return result
            } catch (err: any) {
              console.warn(`⚠️ PostgreSQL operation failed. Falling back to local Mock Database:`, err.message)
              useMock = true
              return (mockDb as any)[prop](...args)
            }
          }
        }
        return val
      } catch (err: any) {
        console.warn(`⚠️ PostgreSQL access failed. Falling back to local Mock Database:`, err.message)
        useMock = true
        return mockDb[prop as keyof typeof mockDb]
      }
    },
  }
)

export type Database = typeof db
