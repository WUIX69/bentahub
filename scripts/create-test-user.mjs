import pg from "pg";
import bcryptjs from "bcryptjs";

const { Pool } = pg;

async function createTestUser() {
  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    // Hash password
    const hashedPassword = await bcryptjs.hash("Test@12345", 10);

    // Generate ID
    const id = `${Date.now()}-test123`;

    // Insert user
    await pool.query(
      `
      INSERT INTO users (id, full_name, email, password, role, is_email_verified, is_active, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
      ON CONFLICT (email) DO NOTHING
    `,
      [
        id,
        "Test Customer",
        "testcustomer@bentahub.local",
        hashedPassword,
        "customer",
        true,
        true,
      ]
    );

    console.log("✅ Test user created!");
    console.log("Email: testcustomer@bentahub.local");
    console.log("Password: Test@12345");

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

createTestUser();
