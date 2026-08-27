import fs from "node:fs";
const file=fs.readFileSync(new URL("../lib/model-data.ts",import.meta.url),"utf8");
const sourceIds=[...file.matchAll(/\{id:\"([^\"]+)\",publisher:/g)].map(m=>m[1]);
const categoryIds=[...file.matchAll(/\{id:\"([^\"]+)\",short:/g)].map(m=>m[1]);
const cityIds=["ottawa","calgary","waterloo","halifax","moncton","guadalajara"];
if(new Set(sourceIds).size!==sourceIds.length)throw new Error("Duplicate source id");
if(new Set(categoryIds).size!==categoryIds.length)throw new Error("Duplicate category id");
for(const city of cityIds){const count=(file.match(new RegExp(`${city}:v\\(`,"g"))||[]).length;if(count!==categoryIds.length)throw new Error(`${city}: ${count}/${categoryIds.length} rows`)}
for(const m of file.matchAll(/v\((\d+),/g)){const score=Number(m[1]);if(score<0||score>100)throw new Error(`Score out of range: ${score}`)}
console.log(`Validated ${categoryIds.length} categories, ${cityIds.length} places and ${sourceIds.length} sources.`);
