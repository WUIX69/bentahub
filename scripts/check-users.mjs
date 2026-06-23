import pg from "pg";

const { Pool } = pg;

async function checkUsers() {
  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    const result = await pool.query("SELECT id, email, role FROM users LIMIT 5");
    console.log("👥 Existing users:", result.rows);

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

checkUsers();
