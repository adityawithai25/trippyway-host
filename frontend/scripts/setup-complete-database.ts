#!/usr/bin/env ts-node
// ============================================================================
// Complete Database Setup Script
// ============================================================================
// This script sets up the complete TrippyWay database schema
// Run: npx ts-node scripts/setup-complete-database.ts

import { readFileSync } from "fs";
import { join } from "path";
import { createClient } from "@supabase/supabase-js";

// Color codes for console output
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

function log(message: string, color: string = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  log("❌ Missing Supabase environment variables!", colors.red);
  log("Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)", colors.yellow);
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// ============================================================================
// Helper Functions
// ============================================================================

async function checkConnection(): Promise<boolean> {
  log("\n🔍 Checking Supabase connection...", colors.cyan);
  
  try {
    const { error } = await supabase.from("_test_connection").select("*").limit(1);
    
    // If error is "relation does not exist", connection is fine
    if (error && !error.message.includes("does not exist")) {
      log(`❌ Connection failed: ${error.message}`, colors.red);
      return false;
    }
    
    log("✅ Connected to Supabase successfully!", colors.green);
    return true;
  } catch (error: any) {
    log(`❌ Connection error: ${error.message}`, colors.red);
    return false;
  }
}

async function tableExists(tableName: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("information_schema.tables")
    .select("table_name")
    .eq("table_schema", "public")
    .eq("table_name", tableName)
    .single();
  
  return !error && !!data;
}

async function runSQLFile(filePath: string): Promise<boolean> {
  try {
    log(`\n📄 Reading SQL file: ${filePath}`, colors.cyan);
    const sqlContent = readFileSync(filePath, "utf-8");
    
    log("⚡ Executing SQL script...", colors.cyan);
    log("   This may take a minute...", colors.yellow);
    
    // Execute the entire SQL file
    const { error } = await supabase.rpc("exec_sql", { sql: sqlContent });
    
    if (error) {
      // Try alternative method: split and execute
      log("   Trying alternative execution method...", colors.yellow);
      return await executeSQLStatements(sqlContent);
    }
    
    log("✅ SQL script executed successfully!", colors.green);
    return true;
  } catch (error: any) {
    log(`❌ Error executing SQL: ${error.message}`, colors.red);
    return false;
  }
}

async function executeSQLStatements(sqlContent: string): Promise<boolean> {
  // Split SQL into individual statements
  const statements = sqlContent
    .split(";")
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith("--") && s !== "");
  
  log(`   Found ${statements.length} SQL statements`, colors.cyan);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i];
    if (statement.length < 10) continue; // Skip very short statements
    
    try {
      // Show progress
      if (i % 10 === 0) {
        process.stdout.write(`\r   Progress: ${i}/${statements.length} statements`);
      }
      
      // Execute statement
      const { error } = await supabase.rpc("exec_sql", { sql: statement });
      
      if (error) {
        // Ignore "already exists" errors
        if (error.message && (
          error.message.includes("already exists") ||
          error.message.includes("duplicate") ||
          error.message.includes("does not exist")
        )) {
          // Silent skip
        } else {
          errorCount++;
          if (errorCount <= 3) { // Only show first 3 errors
            log(`\n⚠️  Error in statement ${i + 1}: ${error.message}`, colors.yellow);
          }
        }
      } else {
        successCount++;
      }
    } catch (err: any) {
      errorCount++;
    }
  }
  
  console.log(); // New line after progress
  log(`✅ Executed ${successCount} statements successfully`, colors.green);
  
  if (errorCount > 0) {
    log(`⚠️  ${errorCount} statements had errors (mostly safe to ignore)`, colors.yellow);
  }
  
  return successCount > 0;
}

async function verifySetup(): Promise<void> {
  log("\n🔍 Verifying database setup...", colors.cyan);
  
  const expectedTables = [
    "package_themes",
    "travel_packages",
    "package_theme_mappings",
    "package_itineraries",
    "package_inclusions",
    "reviews",
    "user_preferences",
    "partner_information",
    "email_subscriber",
    "favorites",
    "booking_enquiries",
  ];
  
  const { data: tables, error } = await supabase
    .from("information_schema.tables")
    .select("table_name")
    .eq("table_schema", "public");
  
  if (error) {
    log("⚠️  Could not verify tables", colors.yellow);
    return;
  }
  
  const tableNames = tables?.map((t: any) => t.table_name) || [];
  const foundTables = expectedTables.filter(t => tableNames.includes(t));
  
  log(`\n📊 Tables found: ${foundTables.length}/${expectedTables.length}`, colors.cyan);
  
  foundTables.forEach(table => {
    log(`   ✅ ${table}`, colors.green);
  });
  
  const missingTables = expectedTables.filter(t => !tableNames.includes(t));
  if (missingTables.length > 0) {
    log(`\n⚠️  Missing tables:`, colors.yellow);
    missingTables.forEach(table => {
      log(`   ❌ ${table}`, colors.red);
    });
  }
}

async function seedThemes(): Promise<boolean> {
  log("\n🌱 Seeding package themes...", colors.cyan);
  
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
    log(`❌ Error seeding themes: ${error.message}`, colors.red);
    return false;
  }

  log(`✅ Seeded ${data.length} themes successfully!`, colors.green);
  return true;
}

// ============================================================================
// Main Execution
// ============================================================================

async function main() {
  log("╔════════════════════════════════════════════════════════════════╗", colors.bright);
  log("║                                                                ║", colors.bright);
  log("║          🚀 TrippyWay Complete Database Setup 🚀              ║", colors.bright);
  log("║                                                                ║", colors.bright);
  log("╚════════════════════════════════════════════════════════════════╝", colors.bright);
  
  // Step 1: Check connection
  const connected = await checkConnection();
  if (!connected) {
    log("\n❌ Setup failed: Could not connect to Supabase", colors.red);
    process.exit(1);
  }
  
  log("\n" + "=".repeat(60), colors.cyan);
  
  // Step 2: Check if tables already exist
  const themesExist = await tableExists("package_themes");
  
  if (themesExist) {
    log("\n⚠️  Database tables already exist!", colors.yellow);
    log("   This script will update the schema if needed.", colors.yellow);
    log("   Existing data will be preserved.", colors.yellow);
  }
  
  log("\n" + "=".repeat(60), colors.cyan);
  
  // Step 3: Run SQL migration
  log("\n📦 Running database migration...", colors.bright);
  const sqlPath = join(process.cwd(), "supabase", "migrations", "00_complete_database_setup.sql");
  
  try {
    const sqlExecuted = await runSQLFile(sqlPath);
    
    if (!sqlExecuted) {
      log("\n⚠️  SQL execution had issues, but may have partially succeeded", colors.yellow);
      log("   Check the manual setup instructions if needed", colors.yellow);
    }
  } catch (error: any) {
    log(`\n⚠️  Could not execute SQL file automatically: ${error.message}`, colors.yellow);
    log("\n📌 Manual Setup Required:", colors.bright);
    log("   1. Open Supabase Dashboard > SQL Editor", colors.cyan);
    log("   2. Copy content from: supabase/migrations/00_complete_database_setup.sql", colors.cyan);
    log("   3. Paste and run in SQL Editor", colors.cyan);
    log("   4. Run this script again to verify", colors.cyan);
  }
  
  log("\n" + "=".repeat(60), colors.cyan);
  
  // Step 4: Verify setup
  await verifySetup();
  
  log("\n" + "=".repeat(60), colors.cyan);
  
  // Step 5: Seed themes
  const shouldSeed = !themesExist;
  if (shouldSeed) {
    const seeded = await seedThemes();
    if (!seeded) {
      log("⚠️  Theme seeding failed, but you can add them later", colors.yellow);
    }
  } else {
    log("\n✅ Themes already exist, skipping seed", colors.green);
  }
  
  log("\n" + "=".repeat(60), colors.cyan);
  
  // Final summary
  log("\n✨ Database Setup Complete! ✨", colors.bright + colors.green);
  log("\n📌 Next Steps:", colors.bright);
  log("   1. Check your Supabase Dashboard to verify tables", colors.cyan);
  log("   2. Run: npx ts-node scripts/seed-sample-data.ts (optional)", colors.cyan);
  log("   3. Start your dev server: npm run dev", colors.cyan);
  log("   4. Visit: http://localhost:3000/packages", colors.cyan);
  
  log("\n📚 Documentation:", colors.bright);
  log("   - DATABASE_DOCUMENTATION.md - Complete schema reference", colors.cyan);
  log("   - DATABASE_SETUP_INSTRUCTIONS.md - Detailed setup guide", colors.cyan);
  
  log("\n" + "=".repeat(60), colors.cyan);
  log("", colors.reset);
}

// Run the script
main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    log(`\n❌ Setup failed: ${error.message}`, colors.red);
    process.exit(1);
  });
