import pg from "pg";

const { Pool } = pg;

async function createTables() {
  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    console.log("📋 Creating database tables...");

    // Create orders table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id varchar(36) PRIMARY KEY NOT NULL,
        user_id varchar(36) NOT NULL,
        status varchar(50) DEFAULT 'pending' NOT NULL,
        payment_method varchar(50) NOT NULL,
        total_amount numeric(10, 2) NOT NULL,
        branch varchar(100) NOT NULL,
        notes varchar(500),
        is_paid boolean DEFAULT false NOT NULL,
        paid_at timestamp with time zone,
        created_at timestamp with time zone DEFAULT now() NOT NULL,
        updated_at timestamp with time zone DEFAULT now() NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);
    console.log("✅ Orders table created");

    // Create order_items table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id varchar(36) PRIMARY KEY NOT NULL,
        order_id varchar(36) NOT NULL,
        product_id varchar(36) NOT NULL,
        product_name varchar(255) NOT NULL,
        quantity integer NOT NULL,
        price numeric(10, 2) NOT NULL,
        subtotal numeric(10, 2) NOT NULL,
        created_at timestamp with time zone DEFAULT now() NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
      );
    `);
    console.log("✅ Order items table created");

    // Create cart_items table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS cart_items (
        id varchar(36) PRIMARY KEY NOT NULL,
        user_id varchar(36) NOT NULL,
        product_id varchar(36) NOT NULL,
        product_name varchar(255) NOT NULL,
        price numeric(10, 2) NOT NULL,
        quantity integer DEFAULT 1 NOT NULL,
        subtotal numeric(10, 2) NOT NULL,
        image varchar(500),
        category varchar(100),
        branch varchar(100) NOT NULL,
        added_at timestamp with time zone DEFAULT now() NOT NULL,
        updated_at timestamp with time zone DEFAULT now() NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);
    console.log("✅ Cart items table created");

    // Create notifications table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS notifications (
        id varchar(36) PRIMARY KEY NOT NULL,
        user_id varchar(36) NOT NULL,
        type varchar(50) NOT NULL,
        title varchar(255) NOT NULL,
        message text NOT NULL,
        related_order_id varchar(36),
        related_product_id varchar(36),
        is_read boolean DEFAULT false NOT NULL,
        read_at timestamp with time zone,
        created_at timestamp with time zone DEFAULT now() NOT NULL,
        expires_at timestamp with time zone,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);
    console.log("✅ Notifications table created");

    console.log("✅ All tables created successfully!");
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

createTables();
