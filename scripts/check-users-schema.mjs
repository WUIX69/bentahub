import pg from "pg";

const { Pool } = pg;

async function checkUsersSchema() {
  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    const result = await pool.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'users'
      ORDER BY ordinal_position
    `);

    console.log("👤 Users table schema:");
    result.rows.forEach((row) => {
      console.log(
        `  ${row.column_name}: ${row.data_type} ${row.is_nullable === "NO" ? "NOT NULL" : "nullable"}`
      );
    });

    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error(
      "❌ Error:",
      error instanceof Error ? error.message : error
    );
    process.exit(1);
  }
}

checkUsersSchema();
