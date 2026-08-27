import {categories,cities,sources} from "../lib/model-data.ts";

const unique=(items,label)=>{
  if(new Set(items).size!==items.length) throw new Error(`Duplicate ${label}`);
};
const ids=cities.map(city=>city.id);
const sourceIds=sources.map(source=>source.id);
const categoryIds=categories.map(category=>category.id);

unique(ids,"city id");
unique(sourceIds,"source id");
unique(categoryIds,"category id");
unique(categories.map(category=>category.rank),"default category rank");

if(cities.length!==12) throw new Error(`Expected 12 places, found ${cities.length}`);
if(cities.filter(city=>city.candidate).length!==11) throw new Error("Expected 11 Canadian candidates");
if(categories.length!==16) throw new Error(`Expected 16 categories, found ${categories.length}`);

for(const source of sources){
  if(!source.url.startsWith("https://")) throw new Error(`${source.id}: non-HTTPS URL`);
}

for(const category of categories){
  const valueIds=Object.keys(category.values);
  if(valueIds.length!==ids.length||ids.some(id=>!valueIds.includes(id))){
    throw new Error(`${category.id}: incomplete city coverage`);
  }
  for(const sourceId of category.sourceIds){
    if(!sourceIds.includes(sourceId)) throw new Error(`${category.id}: unknown source ${sourceId}`);
  }
  for(const [cityId,value] of Object.entries(category.values)){
    if(!Number.isInteger(value.score)||value.score<0||value.score>100){
      throw new Error(`${category.id}/${cityId}: invalid score ${value.score}`);
    }
    if(!["Alta","Media","Baja"].includes(value.confidence)){
      throw new Error(`${category.id}/${cityId}: invalid confidence`);
    }
    if(value.facts.length<2||value.facts.some(fact=>!fact.trim())){
      throw new Error(`${category.id}/${cityId}: at least two facts required`);
    }
    if(!value.geography?.trim()) throw new Error(`${category.id}/${cityId}: geography required`);
  }
}

const ordered=[...categories].sort((a,b)=>a.rank-b.rank);
const weights=ordered.map((_,index)=>{
  let weight=0;
  for(let rank=index+1;rank<=ordered.length;rank+=1) weight+=1/rank;
  return weight/ordered.length;
});
const ranking=cities.filter(city=>city.candidate).map(city=>({
  name:city.name,
  score:ordered.reduce((sum,category,index)=>sum+category.values[city.id].score*weights[index],0)
})).sort((a,b)=>b.score-a.score);

console.log(`Validated ${categories.length} categories, ${cities.length} places, ${categories.length*cities.length} score cells and ${sources.length} sources.`);
console.log(`Default ROC ranking: ${ranking.map((city,index)=>`${index+1}. ${city.name} ${city.score.toFixed(1)}`).join(" | ")}`);
