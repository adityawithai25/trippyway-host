#!/usr/bin/env ts-node
// ============================================================================
// Database Setup Script
// ============================================================================
// This script sets up the database schema and seeds initial data
// Run: npx ts-node scripts/setup-database.ts

import { readFileSync } from "fs";
import { join } from "path";
import { createClient } from "@supabase/supabase-js";

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing Supabase environment variables!");
  console.error("Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkConnection() {
  console.log("🔍 Checking Supabase connection...");
  const { data, error } = await supabase.from("_test").select("*").limit(1);
  
  if (error && !error.message.includes("does not exist")) {
    console.error("❌ Connection failed:", error.message);
    return false;
  }
  
  console.log("✅ Connected to Supabase successfully!");
  return true;
}

async function runMigration() {
  console.log("\n📄 Running database migration...");
  
  try {
    // Read the SQL migration file
    const sqlPath = join(process.cwd(), "supabase", "migrations", "create_theme_packages_schema.sql");
    const sqlContent = readFileSync(sqlPath, "utf-8");
    
    // Split by semicolon and execute each statement
    const statements = sqlContent
      .split(";")
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith("--"));
    
    console.log(`📝 Executing ${statements.length} SQL statements...`);
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement) {
        try {
          await supabase.rpc("exec_sql", { sql: statement });
          process.stdout.write(`\r⏳ Progress: ${i + 1}/${statements.length}`);
        } catch (err: any) {
          // Ignore "already exists" errors
          if (!err.message?.includes("already exists")) {
            console.error(`\n❌ Error in statement ${i + 1}:`, err.message);
          }
        }
      }
    }
    
    console.log("\n✅ Migration completed!");
    return true;
  } catch (error: any) {
    console.error("❌ Migration failed:", error.message);
    console.log("\n💡 Note: You may need to run the SQL file manually in Supabase SQL Editor");
    return false;
  }
}

async function seedThemes() {
  console.log("\n🌱 Seeding themes...");
  
  const themes = [
    {
      name: "Corporate Retreat",
      slug: "corporate-retreat",
      description: "Team building, conferences, workshops, and corporate events",
      icon: "briefcase",
      color: "#3B82F6",
      display_order: 0,
      is_active: true,
      metadata: { default_tags: ["Team Building", "Professional", "Workshops"] },
    },
    {
      name: "College Trip",
      slug: "college-trip",
      description: "Budget-friendly adventures perfect for students",
      icon: "graduation-cap",
      color: "#10B981",
      display_order: 1,
      is_active: true,
      metadata: { default_tags: ["Budget Friendly", "Student Special", "Group Fun"] },
    },
    {
      name: "Influencer Trip",
      slug: "influencer-trip",
      description: "Instagram-worthy locations perfect for content creation",
      icon: "camera",
      color: "#EC4899",
      display_order: 2,
      is_active: true,
      metadata: { default_tags: ["Instagram Worthy", "Photo Ops", "Content Creation"] },
    },
    {
      name: "Designer & Editor Trip",
      slug: "designer-editor-trip",
      description: "Creative inspiration from aesthetic locations",
      icon: "palette",
      color: "#8B5CF6",
      display_order: 3,
      is_active: true,
      metadata: { default_tags: ["Creative", "Aesthetic", "Inspiration"] },
    },
    {
      name: "AI Startup Enthusiast",
      slug: "ai-startup-enthusiast",
      description: "Tech hubs, innovation centers, and networking opportunities",
      icon: "zap",
      color: "#F59E0B",
      display_order: 4,
      is_active: true,
      metadata: { default_tags: ["Tech Hub", "Innovation", "Networking"] },
    },
    {
      name: "Wellness Retreat",
      slug: "wellness-retreat",
      description: "Rejuvenate with yoga, meditation, and spa experiences",
      icon: "heart",
      color: "#14B8A6",
      display_order: 5,
      is_active: true,
      metadata: { default_tags: ["Wellness", "Yoga", "Spa"] },
    },
    {
      name: "Adventure Sports",
      slug: "adventure-sports",
      description: "Thrilling activities for adrenaline junkies",
      icon: "mountain",
      color: "#EF4444",
      display_order: 6,
      is_active: true,
      metadata: { default_tags: ["Adventure", "Extreme", "Sports"] },
    },
    {
      name: "Cultural Exploration",
      slug: "cultural-exploration",
      description: "Immerse in local culture, history, and traditions",
      icon: "compass",
      color: "#F97316",
      display_order: 7,
      is_active: true,
      metadata: { default_tags: ["Culture", "Heritage", "Local Experience"] },
    },
    {
      name: "Family Vacation",
      slug: "family-vacation",
      description: "Family-friendly destinations with activities for all ages",
      icon: "users",
      color: "#06B6D4",
      display_order: 8,
      is_active: true,
      metadata: { default_tags: ["Family Friendly", "All Ages", "Safe"] },
    },
    {
      name: "Luxury Experience",
      slug: "luxury-experience",
      description: "Premium stays and exclusive experiences",
      icon: "sparkles",
      color: "#A855F7",
      display_order: 9,
      is_active: true,
      metadata: { default_tags: ["Luxury", "Premium", "Exclusive"] },
    },
  ];

  const { data, error } = await supabase
    .from("package_themes")
    .upsert(themes, { onConflict: "slug" })
    .select();

  if (error) {
    console.error("❌ Error seeding themes:", error);
    return null;
  }

  console.log(`✅ Seeded ${data.length} themes`);
  return data;
}

async function main() {
  console.log("🚀 Starting database setup...\n");
  console.log("=" .repeat(50));
  
  // Check connection
  const connected = await checkConnection();
  if (!connected) {
    process.exit(1);
  }
  
  // Try to seed themes (tables should already exist from Supabase dashboard)
  console.log("\n" + "=".repeat(50));
  const themes = await seedThemes();
  
  if (themes) {
    console.log("\n" + "=".repeat(50));
    console.log("✨ Database setup completed successfully!");
    console.log("\n📌 Next steps:");
    console.log("1. Run the seed script to add sample packages:");
    console.log("   npx ts-node src/lib/supabase/seed-packages.ts");
    console.log("2. Start your development server:");
    console.log("   npm run dev");
  } else {
    console.log("\n" + "=".repeat(50));
    console.log("⚠️  Setup incomplete!");
    console.log("\n📌 Manual steps required:");
    console.log("1. Go to your Supabase project dashboard");
    console.log("2. Open SQL Editor");
    console.log("3. Copy the content from: supabase/migrations/create_theme_packages_schema.sql");
    console.log("4. Paste and run it in the SQL Editor");
    console.log("5. Run this script again: npx ts-node scripts/setup-database.ts");
  }
  
  console.log("=".repeat(50) + "\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Setup failed:", error);
    process.exit(1);
  });
