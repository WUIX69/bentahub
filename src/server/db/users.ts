import { db } from "@/drizzle/db"
import { users } from "@/drizzle/schema"
import { eq } from "drizzle-orm"

export async function getSharedUserById(id: string) {
  return db.query.users.findFirst({
    where: eq(users.id, id),
  })
}
