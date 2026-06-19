import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function createTables() {
  try {
    console.log("📝 Creating database tables...");

    // Create ENUM types
    await pool.query(`
      DO $$ BEGIN
        CREATE TYPE product_stock_status AS ENUM('in-stock', 'low-stock', 'out-of-stock');
      EXCEPTION WHEN duplicate_object THEN null;
      END $$;
    `);

    await pool.query(`
      DO $$ BEGIN
        CREATE TYPE order_status AS ENUM('pending', 'processing', 'ready', 'completed', 'cancelled');
      EXCEPTION WHEN duplicate_object THEN null;
      END $$;
    `);

    // Create products table if not exists
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
        stock_status product_stock_status DEFAULT 'in-stock' NOT NULL,
        quantity integer DEFAULT 0 NOT NULL,
        branch varchar(100) NOT NULL,
        sku varchar(100) UNIQUE,
        is_active boolean DEFAULT true NOT NULL,
        created_at timestamp with time zone DEFAULT now() NOT NULL,
        updated_at timestamp with time zone DEFAULT now() NOT NULL
      );
    `);

    console.log("✅ Tables created successfully!");
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating tables:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

createTables();
