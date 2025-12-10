/**
 * Image Validation Script
 * 
 * Validates all images in the authentic-images.ts library
 * - Checks if URLs are from authenticated sources
 * - Verifies image accessibility
 * - Reports broken or invalid images
 * 
 * Usage: bun run scripts/validate-images.ts
 */

import {
  DESTINATION_IMAGES,
  CATEGORY_IMAGES,
  THEME_IMAGES,
  ACTIVITY_IMAGES,
  HERO_IMAGES,
  isAuthenticImage,
} from '../src/constants/authentic-images';

interface ValidationResult {
  url: string;
  path: string;
  isAuthentic: boolean;
  isAccessible: boolean;
  statusCode?: number;
  error?: string;
}

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

/**
 * Check if an image URL is accessible
 */
async function checkImageAccessibility(url: string): Promise<{
  isAccessible: boolean;
  statusCode?: number;
  error?: string;
}> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return {
      isAccessible: response.ok,
      statusCode: response.status,
    };
  } catch (error) {
    return {
      isAccessible: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Flatten nested object to get all image URLs with their paths
 */
function flattenObject(
  obj: any,
  prefix: string = ''
): Array<{ url: string; path: string }> {
  const results: Array<{ url: string; path: string }> = [];

  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string' && value.startsWith('http')) {
      results.push({ url: value, path });
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === 'string' && item.startsWith('http')) {
          results.push({ url: item, path: `${path}[${index}]` });
        } else if (typeof item === 'object') {
          results.push(...flattenObject(item, `${path}[${index}]`));
        }
      });
    } else if (typeof value === 'object' && value !== null) {
      results.push(...flattenObject(value, path));
    }
  }

  return results;
}

/**
 * Validate all images
 */
async function validateAllImages(): Promise<void> {
  console.log(`${colors.cyan}╔════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.cyan}║   TrippyWay Image Validation Script       ║${colors.reset}`);
  console.log(`${colors.cyan}╚════════════════════════════════════════════╝${colors.reset}\n`);

  // Collect all images
  const allImages: Array<{ url: string; path: string }> = [
    ...flattenObject(DESTINATION_IMAGES, 'DESTINATION_IMAGES'),
    ...flattenObject(CATEGORY_IMAGES, 'CATEGORY_IMAGES'),
    ...flattenObject(THEME_IMAGES, 'THEME_IMAGES'),
    ...flattenObject(ACTIVITY_IMAGES, 'ACTIVITY_IMAGES'),
    ...flattenObject(HERO_IMAGES, 'HERO_IMAGES'),
  ];

  console.log(`${colors.blue}Found ${allImages.length} images to validate...${colors.reset}\n`);

  const results: ValidationResult[] = [];
  const uniqueUrls = new Map<string, string[]>();

  // Group duplicate URLs
  for (const { url, path } of allImages) {
    if (!uniqueUrls.has(url)) {
      uniqueUrls.set(url, []);
    }
    uniqueUrls.get(url)!.push(path);
  }

  console.log(`${colors.blue}Unique images: ${uniqueUrls.size}${colors.reset}\n`);

  // Validate each unique URL
  let processed = 0;
  for (const [url, paths] of uniqueUrls.entries()) {
    processed++;
    const isAuthentic = isAuthenticImage(url);
    const { isAccessible, statusCode, error } = await checkImageAccessibility(url);

    const result: ValidationResult = {
      url,
      path: paths[0], // Use first path for reporting
      isAuthentic,
      isAccessible,
      statusCode,
      error,
    };

    results.push(result);

    // Progress indicator
    if (processed % 10 === 0 || processed === uniqueUrls.size) {
      process.stdout.write(`\r${colors.yellow}Progress: ${processed}/${uniqueUrls.size}${colors.reset}`);
    }

    // Add small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n');

  // Generate report
  generateReport(results, uniqueUrls);
}

/**
 * Generate validation report
 */
function generateReport(
  results: ValidationResult[],
  duplicateMap: Map<string, string[]>
): void {
  const passed = results.filter(r => r.isAuthentic && r.isAccessible);
  const failed = results.filter(r => !r.isAuthentic || !r.isAccessible);
  const notAuthentic = results.filter(r => !r.isAuthentic);
  const notAccessible = results.filter(r => !r.isAccessible);
  const duplicates = Array.from(duplicateMap.entries()).filter(([_, paths]) => paths.length > 1);

  console.log(`${colors.cyan}╔════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.cyan}║            Validation Summary              ║${colors.reset}`);
  console.log(`${colors.cyan}╚════════════════════════════════════════════╝${colors.reset}\n`);

  console.log(`${colors.green}✓ Passed:${colors.reset} ${passed.length}/${results.length}`);
  console.log(`${colors.red}✗ Failed:${colors.reset} ${failed.length}/${results.length}`);
  console.log(`${colors.yellow}⚠ Not Authentic:${colors.reset} ${notAuthentic.length}`);
  console.log(`${colors.yellow}⚠ Not Accessible:${colors.reset} ${notAccessible.length}`);
  console.log(`${colors.blue}ℹ Duplicate URLs:${colors.reset} ${duplicates.length}\n`);

  // Report not authentic images
  if (notAuthentic.length > 0) {
    console.log(`${colors.red}═══ NOT AUTHENTIC IMAGES ═══${colors.reset}`);
    notAuthentic.forEach(r => {
      console.log(`${colors.red}✗${colors.reset} ${r.path}`);
      console.log(`  URL: ${r.url}\n`);
    });
  }

  // Report not accessible images
  if (notAccessible.length > 0) {
    console.log(`${colors.red}═══ NOT ACCESSIBLE IMAGES ═══${colors.reset}`);
    notAccessible.forEach(r => {
      console.log(`${colors.red}✗${colors.reset} ${r.path}`);
      console.log(`  URL: ${r.url}`);
      console.log(`  Status: ${r.statusCode || 'N/A'}`);
      console.log(`  Error: ${r.error || 'Unknown'}\n`);
    });
  }

  // Report duplicates (informational)
  if (duplicates.length > 0) {
    console.log(`${colors.yellow}═══ DUPLICATE IMAGES ═══${colors.reset}`);
    console.log(`${colors.yellow}(Same image used in multiple places - consider if this is intentional)${colors.reset}\n`);
    duplicates.slice(0, 5).forEach(([url, paths]) => {
      console.log(`${colors.blue}Image:${colors.reset} ${url.substring(0, 80)}...`);
      console.log(`${colors.blue}Used in:${colors.reset}`);
      paths.forEach(path => console.log(`  - ${path}`));
      console.log();
    });
    if (duplicates.length > 5) {
      console.log(`${colors.blue}... and ${duplicates.length - 5} more duplicates${colors.reset}\n`);
    }
  }

  // Final status
  console.log(`${colors.cyan}════════════════════════════════════════════${colors.reset}`);
  if (failed.length === 0) {
    console.log(`${colors.green}✓ All images validated successfully!${colors.reset}`);
  } else {
    console.log(`${colors.red}✗ Validation completed with ${failed.length} issue(s)${colors.reset}`);
    process.exit(1);
  }
  console.log(`${colors.cyan}════════════════════════════════════════════${colors.reset}\n`);
}

// Run validation when executed directly
// Uncomment below to run validation:
// validateAllImages().catch(error => {
//   console.error(`${colors.red}Validation failed:${colors.reset}`, error);
//   process.exit(1);
// });

export { validateAllImages, checkImageAccessibility };
