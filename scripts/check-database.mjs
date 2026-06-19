import pg from "pg";

const { Pool } = pg;

async function checkDatabase() {
  try {
    console.log("🔍 Checking database connection...");

    // Test connection to default postgres database
    const adminPool = new Pool({
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: "roncedrick0",
      database: "postgres",
    });

    const result = await adminPool.query(
      `SELECT datname FROM pg_database WHERE datname = 'bentahub';`
    );

    if (result.rows.length > 0) {
      console.log("✅ Database 'bentahub' exists");
      // Now test the bentahub connection
      const bentahubPool = new Pool({
        host: "localhost",
        port: 5432,
        user: "postgres",
        password: "roncedrick0",
        database: "bentahub",
      });
      try {
        const conn = await bentahubPool.connect();
        conn.release();
        console.log("✅ Can connect to bentahub database");
      } catch (e) {
        console.error("❌ Cannot connect to bentahub:", e);
      }
      await bentahubPool.end();
    } else {
      console.log("❌ Database 'bentahub' does NOT exist");
      console.log("\n📝 Creating bentahub database...");
      await adminPool.query(`CREATE DATABASE bentahub;`);
      console.log("✅ Created database 'bentahub'");
    }

    await adminPool.end();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

checkDatabase();
