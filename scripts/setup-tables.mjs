import pg from "pg";

const { Pool } = pg;

async function checkTables() {
  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    // Check existing tables
    const result = await pool.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
    );
    console.log("📊 Existing tables:", result.rows.map((r) => r.table_name));

    // Create products table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id varchar(36) PRIMARY KEY NOT NULL,
        name varchar(255) NOT NULL,
        description text,
        category varchar(100) NOT NULL,
        price numeric(10, 2) NOT NULL,
        bulk_price numeric(10, 2),
        weight varchar(50),
        image varchar(500),
        stock_status varchar(50) DEFAULT 'in-stock' NOT NULL,
        quantity integer DEFAULT 0 NOT NULL,
        branch varchar(100) NOT NULL,
        sku varchar(100) UNIQUE,
        is_active boolean DEFAULT true NOT NULL,
        created_at timestamp with time zone DEFAULT now() NOT NULL,
        updated_at timestamp with time zone DEFAULT now() NOT NULL
      );
    `);

    console.log("✅ Products table ready");

    // Create order_items table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id varchar(36) PRIMARY KEY NOT NULL,
        order_id varchar(36) NOT NULL,
        product_id varchar(36) NOT NULL,
        product_name varchar(255) NOT NULL,
        quantity integer NOT NULL,
        price numeric(10, 2) NOT NULL,
        subtotal numeric(10, 2) NOT NULL,
        created_at timestamp with time zone DEFAULT now() NOT NULL
      );
    `);

    console.log("✅ Order items table ready");

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

checkTables();
