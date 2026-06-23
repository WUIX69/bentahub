import pg from "pg";

const { Pool } = pg;

async function checkProducts() {
  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    const result = await pool.query("SELECT COUNT(*) as count FROM products");
    console.log("✅ Total products:", result.rows[0].count);

    const categories = await pool.query(
      "SELECT category, COUNT(*) as count FROM products GROUP BY category ORDER BY category"
    );
    console.log("📊 Products by category:");
    categories.rows.forEach((row) => {
      console.log(`   ${row.category}: ${row.count}`);
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

checkProducts();
