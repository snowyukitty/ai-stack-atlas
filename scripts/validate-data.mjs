import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(path, 'utf8');

const products = read('src/data/products.ts');
const categories = read('src/data/categories.ts');
const concepts = read('src/data/concepts.ts');
const rankings = read('src/data/rankings.ts');
const ui = read('src/data/ui.ts');
const companies = read('src/data/companies.ts');

const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function values(source, pattern) {
  return [...source.matchAll(pattern)].map((match) => match[1]);
}

function duplicates(items) {
  const seen = new Set();
  const dupes = new Set();
  for (const item of items) {
    if (seen.has(item)) dupes.add(item);
    seen.add(item);
  }
  return [...dupes];
}

function missing(refs, known) {
  const knownSet = new Set(known);
  return [...new Set(refs.filter((ref) => !knownSet.has(ref)))];
}

const productIds = values(products, /^\s+id:\s*'([^']+)'/gm);
const categoryIds = values(categories, /^\s+id:\s*'([^']+)'/gm);
const productCategories = values(products, /category:\s*'([^']+)'/g);
const rankingProductRefs = values(rankings, /productId:\s*'([^']+)'/g);
const conceptIds = values(concepts, /^\s+id:\s*'([^']+)'/gm);
const conceptSeeRefs = values(concepts, /see:\s*\[([^\]]*)\]/g)
  .flatMap((list) => values(list, /'([^']+)'/g));
const urls = values(products, /url:\s*'([^']+)'/g);
const companyIds = values(companies, /^\s+id:\s*'([^']+)'/gm);
const companyProductRefs = values(companies, /productIds:\s*\[([^\]]*)\]/g)
  .flatMap((list) => values(list, /'([^']+)'/g));

assert(productIds.length > 0, 'No products found.');
assert(categoryIds.length > 0, 'No categories found.');
assert(duplicates(productIds).length === 0, `Duplicate product ids: ${duplicates(productIds).join(', ')}`);
assert(duplicates(categoryIds).length === 0, `Duplicate category ids: ${duplicates(categoryIds).join(', ')}`);
assert(duplicates(conceptIds).length === 0, `Duplicate concept ids: ${duplicates(conceptIds).join(', ')}`);
assert(missing(productCategories, categoryIds).length === 0, `Invalid product categories: ${missing(productCategories, categoryIds).join(', ')}`);
assert(missing(rankingProductRefs, productIds).length === 0, `Missing ranking product refs: ${missing(rankingProductRefs, productIds).join(', ')}`);
assert(missing(conceptSeeRefs, conceptIds).length === 0, `Missing concept see refs: ${missing(conceptSeeRefs, conceptIds).join(', ')}`);
assert(urls.every((url) => /^https?:\/\//.test(url)), `Non-http URLs: ${urls.filter((url) => !/^https?:\/\//.test(url)).join(', ')}`);
assert(companyIds.length > 0, 'No companies found.');
assert(duplicates(companyIds).length === 0, `Duplicate company ids: ${duplicates(companyIds).join(', ')}`);
assert(missing(companyProductRefs, productIds).length === 0, `Company productIds not in catalog: ${missing(companyProductRefs, productIds).join(', ')}`);

for (const [path, source] of [
  ['src/data/products.ts', products],
  ['src/data/categories.ts', categories],
  ['src/data/concepts.ts', concepts],
  ['src/data/rankings.ts', rankings],
  ['src/data/ui.ts', ui],
  ['src/data/companies.ts', companies],
]) {
  const counts = {
    zh: values(source, /\bzh:/g).length,
    en: values(source, /\ben:/g).length,
    ja: values(source, /\bja:/g).length,
  };
  assert(
    counts.zh === counts.en && counts.en === counts.ja,
    `${path} has uneven locale keys: zh=${counts.zh}, en=${counts.en}, ja=${counts.ja}`,
  );
}

const lastUpdated = /LAST_UPDATED\s*=\s*'([^']+)'/.exec(products)?.[1];
assert(!!lastUpdated, 'LAST_UPDATED is missing.');
assert(/^\d{4}-\d{2}-\d{2}$/.test(lastUpdated || ''), `LAST_UPDATED is not ISO yyyy-mm-dd: ${lastUpdated}`);

const contentDates = values(`${products}\n${rankings}`, /\b(20\d{2}-\d{2}-\d{2})\b/g);
const newestContentDate = contentDates.sort().at(-1);
assert(
  !newestContentDate || lastUpdated >= newestContentDate,
  `LAST_UPDATED (${lastUpdated}) is older than content date ${newestContentDate}.`,
);

if (failures.length > 0) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'));
  process.exit(1);
}

console.log(`Data validation passed: ${productIds.length} products, ${categoryIds.length} categories, ${companyIds.length} companies.`);
