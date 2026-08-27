export type CityId = "ottawa" | "calgary" | "waterloo" | "halifax" | "moncton" | "toronto" | "vancouver" | "montreal" | "quebec" | "victoria" | "winnipeg" | "guadalajara";
export type NewCityId = "toronto" | "vancouver" | "montreal" | "quebec" | "victoria" | "winnipeg";
export type Confidence = "Alta" | "Media" | "Baja";

export interface Source { id:string; publisher:string; title:string; year:string; url:string; tier:"Gobierno"|"Instituto público"|"Industria"|"Estudio" }
export interface Category {
  id:string; short:string; name:string; description:string; rank:number; benchmark:string; normalization:string; sourceIds:string[];
  values:Record<string,{score:number;confidence:Confidence;facts:string[];geography?:string}>;
}

export const cities:{id:CityId;name:string;province:string;candidate:boolean;color:string}[]=[
  {id:"ottawa",name:"Ottawa",province:"Ontario",candidate:true,color:"#153a59"},
  {id:"calgary",name:"Calgary",province:"Alberta",candidate:true,color:"#de6b35"},
  {id:"waterloo",name:"Kitchener–Waterloo",province:"Ontario",candidate:true,color:"#2f7f73"},
  {id:"halifax",name:"Halifax",province:"Nova Scotia",candidate:true,color:"#735a93"},
  {id:"moncton",name:"Moncton–Dieppe",province:"New Brunswick",candidate:true,color:"#b38a24"},
  {id:"toronto",name:"Toronto",province:"Ontario",candidate:true,color:"#4f8cff"},
  {id:"vancouver",name:"Vancouver",province:"British Columbia",candidate:true,color:"#30c9a8"},
  {id:"montreal",name:"Montréal",province:"Québec",candidate:true,color:"#ff5ea8"},
  {id:"quebec",name:"Québec City",province:"Québec",candidate:true,color:"#7b6cff"},
  {id:"victoria",name:"Victoria",province:"British Columbia",candidate:true,color:"#40bde8"},
  {id:"winnipeg",name:"Winnipeg",province:"Manitoba",candidate:true,color:"#ef9d32"},
  {id:"guadalajara",name:"Guadalajara",province:"Jalisco · benchmark",candidate:false,color:"#a84d5b"},
];

export const sources:Source[]=[
  {id:"crime25",publisher:"Statistics Canada",title:"Police-reported crime statistics by CMA, 2025",year:"2025",tier:"Gobierno",url:"https://www150.statcan.gc.ca/n1/daily-quotidien/260722/t004a-eng.htm"},
  {id:"census21",publisher:"Statistics Canada",title:"2021 Census Profile — census metropolitan areas",year:"2021",tier:"Gobierno",url:"https://www12.statcan.gc.ca/census-recensement/2021/dp-pd/prof/index.cfm?Lang=E"},
  {id:"labour26",publisher:"Statistics Canada",title:"Labour Force Survey, July 2026 — CMA table",year:"2026",tier:"Gobierno",url:"https://www150.statcan.gc.ca/n1/daily-quotidien/260807/t007a-eng.htm"},
  {id:"rent25",publisher:"CMHC",title:"Rental Market Report — major centres",year:"2025",tier:"Gobierno",url:"https://www.cmhc-schl.gc.ca/professionals/housing-markets-data-and-research/market-reports/rental-market-reports-major-centres"},
  {id:"mbm24",publisher:"Statistics Canada",title:"Market Basket Measure thresholds",year:"2024",tier:"Gobierno",url:"https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1110006601"},
  {id:"jobs",publisher:"Government of Canada Job Bank",title:"Occupational outlooks, NOC 51110, 52113, 11202 and 41210",year:"2025–2027",tier:"Gobierno",url:"https://www.jobbank.gc.ca/trend-analysis/search-job-outlooks"},
  {id:"health24",publisher:"Statistics Canada / CIHI",title:"Canadians with a regular health care provider",year:"2023–2024",tier:"Instituto público",url:"https://www.cihi.ca/en/indicators/canadians-with-a-regular-health-provider"},
  {id:"unmet22",publisher:"Statistics Canada",title:"Unmet health care needs by province",year:"2022",tier:"Gobierno",url:"https://www150.statcan.gc.ca/n1/daily-quotidien/250305/cg-a004-png-eng.htm"},
  {id:"piaac22",publisher:"Statistics Canada",title:"Programme for the International Assessment of Adult Competencies",year:"2022",tier:"Gobierno",url:"https://www150.statcan.gc.ca/n1/daily-quotidien/241210/g-a001-eng.htm"},
  {id:"pisa22",publisher:"CMEC",title:"PISA 2022 highlights — Canadian provinces",year:"2022",tier:"Instituto público",url:"https://www.cmec.ca/docs/pisa2022/PISA-2022_Highlights_FINAL_EN.pdf"},
  {id:"mobility",publisher:"Statistics Canada",title:"Intergenerational income mobility in Canada",year:"2021",tier:"Estudio",url:"https://www150.statcan.gc.ca/n1/pub/11f0019m/11f0019m2021001-eng.htm"},
  {id:"climate",publisher:"Environment and Climate Change Canada",title:"Canadian Climate Normals 1991–2020",year:"1991–2020",tier:"Gobierno",url:"https://climate.weather.gc.ca/climate_normals/"},
  {id:"ottwater",publisher:"City of Ottawa",title:"Climate Ready Ottawa",year:"2025",tier:"Gobierno",url:"https://ottawa.ca/en/climate-ready-ottawa"},
  {id:"calwater",publisher:"City of Calgary",title:"Water Efficiency Plan",year:"2026",tier:"Gobierno",url:"https://www.calgary.ca/water/programs/water-efficiency-strategy.html"},
  {id:"watwater",publisher:"Region of Waterloo",title:"Water Supply Strategy 2051",year:"2024",tier:"Gobierno",url:"https://www.regionofwaterloo.ca/programs-and-services/water-and-wastewater/reports-and-plans/water-supply-strategy/"},
  {id:"monwater",publisher:"City of Moncton",title:"Climate Change Adaptation Plan",year:"2025",tier:"Gobierno",url:"https://www.moncton.ca/en/my-services-environment/climate-change-adaptation"},
  {id:"gdlwater",publisher:"CONAGUA",title:"Disponibilidad de acuíferos — Jalisco",year:"2023",tier:"Gobierno",url:"https://sigagis.conagua.gob.mx/gas1/sections/Edos/jalisco/jalisco.html"},
  {id:"covidgdp",publisher:"Statistics Canada",title:"Provincial GDP shock and recovery during COVID-19",year:"2020–2021",tier:"Gobierno",url:"https://www150.statcan.gc.ca/n1/pub/11-631-x/11-631-x2021002-eng.htm"},
  {id:"jaliscoGDP",publisher:"INEGI",title:"Producto interno bruto por entidad federativa — Jalisco",year:"2020–2023",tier:"Gobierno",url:"https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2024/PIBEF/PIBEF2023_Jal.pdf"},
  {id:"green",publisher:"Statistics Canada",title:"Urban greenness and access to parks",year:"2019–2022",tier:"Gobierno",url:"https://www150.statcan.gc.ca/n1/daily-quotidien/221117/dq221117e-eng.htm"},
  {id:"urban",publisher:"Statistics Canada",title:"Downtown population density by CMA",year:"2021",tier:"Gobierno",url:"https://www150.statcan.gc.ca/n1/daily-quotidien/220209/t003b-eng.htm"},
  {id:"ibc",publisher:"Insurance Bureau of Canada",title:"Severe weather insured losses",year:"2024–2025",tier:"Industria",url:"https://www.ibc.ca/news-insights/news/2024-shatters-record-for-costliest-year-for-severe-weather-related-losses-in-canadian-history-at-8-5-billion"},
  {id:"risk",publisher:"Public Safety Canada",title:"National Risk Profile",year:"2024",tier:"Gobierno",url:"https://publications.gc.ca/collections/collection_2024/sp-ps/PS1-27-2024-eng.pdf"},
  {id:"energy",publisher:"Canada Energy Regulator",title:"Provincial and territorial energy profiles",year:"2021–2024",tier:"Gobierno",url:"https://www.cer-rec.gc.ca/en/data-analysis/energy-markets/province-territory-energy-profiles/"},
  {id:"food",publisher:"Statistics Canada",title:"Farm cash receipts by province",year:"2025",tier:"Gobierno",url:"https://www150.statcan.gc.ca/n1/daily-quotidien/260226/t002c-eng.htm"},
  {id:"gdlcrime",publisher:"IIEG Jalisco / INEGI ENSU",title:"Seguridad pública urbana — Área Metropolitana de Guadalajara",year:"2025",tier:"Gobierno",url:"https://iieg.gob.mx/ns/wp-content/uploads/2026/01/ficha_encuesta_nacional_seguridad_publica_urbana_ensu_jalisco_dic2025.html"},
  {id:"gdlcensus",publisher:"INEGI",title:"Panorama sociodemográfico de Jalisco",year:"2020",tier:"Gobierno",url:"https://www.inegi.org.mx/contenidos/productos/prod_serv/contenidos/espanol/bvinegi/productos/nueva_estruc/702825197872.pdf"},
  {id:"torwater",publisher:"City of Toronto",title:"Tap Water Quality and System Reports",year:"2025",tier:"Gobierno",url:"https://www.toronto.ca/services-payments/water-environment/tap-water-in-toronto/tap-water-quality-system-reports/"},
  {id:"vanwater",publisher:"City of Vancouver",title:"Water Demand Management Strategy",year:"2025",tier:"Gobierno",url:"https://vancouver.ca/files/cov/water-demand-management-strategy-2025.pdf"},
  {id:"mtlwater",publisher:"Ville de Montréal",title:"2025–2034 Montréal Water Strategy",year:"2026",tier:"Gobierno",url:"https://montreal.ca/en/articles/2025-2034-montreal-water-strategy-commitment-to-future-montreal-water-87939"},
  {id:"qcwater",publisher:"Ville de Québec",title:"Gestion et quantité de l’eau potable",year:"2024–2026",tier:"Gobierno",url:"https://www.ville.quebec.qc.ca/apropos/planification-orientations/environnement/eau/gestion_eau/quantite.aspx"},
  {id:"vicwater",publisher:"Capital Regional District",title:"Greater Victoria water supply and Sooke Lake Reservoir",year:"2026",tier:"Gobierno",url:"https://www.crd.ca/programs-services/water/greater-victorias-water-supply"},
  {id:"winwater",publisher:"City of Winnipeg",title:"Shoal Lake and Winnipeg's drinking water",year:"2024–2026",tier:"Gobierno",url:"https://legacy.winnipeg.ca/waterandwaste/water/shoallake.stm"},
  {id:"vanadapt",publisher:"City of Vancouver",title:"Climate Change Adaptation Strategy",year:"2024–2026",tier:"Gobierno",url:"https://vancouver.ca/green-vancouver/climate-change-adaptation-strategy.aspx"},
  {id:"winadapt",publisher:"City of Winnipeg",title:"Climate resilience and Climate Action Plan update",year:"2026",tier:"Gobierno",url:"https://www.winnipeg.ca/services-programs/trees-environment/climate-action/climate-resilience"},
  {id:"jobstor",publisher:"Government of Canada Job Bank",title:"Producers, directors, choreographers and related occupations — Toronto",year:"2025–2027",tier:"Gobierno",url:"https://www.nl.jobbank.gc.ca/marketreport/outlook-occupation/7911/geo9219"},
  {id:"jobsvan",publisher:"Government of Canada Job Bank",title:"Producers and directors — Vancouver region",year:"2025–2027",tier:"Gobierno",url:"https://www.jobbank.gc.ca/marketreport/outlook-occupation/27218/39070"},
  {id:"jobsmtl",publisher:"Government of Canada Job Bank",title:"Producers, directors and related occupations — Montréal",year:"2025–2027",tier:"Gobierno",url:"https://www.jobbank.gc.ca/outlookreport/occupation/5383"},
  {id:"jobsqc",publisher:"Government of Canada Job Bank",title:"Producers, directors and related occupations — Québec regions",year:"2025–2027",tier:"Gobierno",url:"https://www.nl.jobbank.gc.ca/marketreport/outlook-occupation/7911/QC"},
  {id:"jobswin",publisher:"Government of Canada Job Bank",title:"Film and video camera operators — Winnipeg",year:"2025–2027",tier:"Gobierno",url:"https://www.jobbank.gc.ca/outlookreport/occupation/5531"},
];

const v=(score:number,confidence:Confidence,facts:string[],geography?:string)=>({score,confidence,facts,geography});
const clamp=(value:number)=>Math.max(0,Math.min(100,value));
const securityScore=(csi:number,rate:number)=>Math.round(
  .7*clamp(100*(130-csi)/(130-40))+
  .3*clamp(100*(9000-rate)/(9000-3000))
);
export const categories:Category[]=[
  {id:"economy",short:"Economía",name:"Empleo e ingresos",rank:3,description:"Mercado laboral, ingreso disponible y estabilidad del empleo.",benchmark:"Canadá: desempleo CMA e ingreso mediano nacional como punto 50.",normalization:"55% desempleo (0=12%, 100=3%) y 45% ingreso mediano después de impuestos (0=CAD 55k, 100=CAD 95k).",sourceIds:["labour26","census21"],values:{
    ottawa:v(90,"Alta",["Ingreso familiar mediano después de impuestos: CAD 84,000 (2020)","Mercado diversificado y amortiguado por empleo público"],"CMA / parte Ontario"),calgary:v(87,"Alta",["Ingreso familiar mediano después de impuestos: ~CAD 85,000 (2020)","Mayor sensibilidad cíclica a energía"],"CMA"),waterloo:v(79,"Alta",["Ingreso familiar mediano después de impuestos: CAD 81,000 (2020)","Base tecnológica y manufacturera"],"CMA"),halifax:v(70,"Alta",["Desempleo: 5.7% en julio de 2026","Ingreso por debajo de grandes CMA"],"CMA / provincia"),moncton:v(66,"Media",["Mercado pequeño; recuperación pospandemia fuerte","Menor ingreso nominal"],"CMA / región"),guadalajara:v(53,"Media",["Desempleo urbano: 1.5% en 2026-T1","Informalidad y menor ingreso limitan comparabilidad"],"Ciudad / Jalisco")}},
  {id:"housing",short:"Vivienda",name:"Vivienda y costo básico",rank:4,description:"Renta, disponibilidad y presión del costo básico sobre el ingreso.",benchmark:"Renta CMHC de 2 recámaras y umbral MBM 2024; Canadá urbano es referencia central.",normalization:"60% carga renta/ingreso (100≤20%, 0≥45%) y 40% vacancia (100≥5%, 0≤1%).",sourceIds:["rent25","mbm24","census21"],values:{
    ottawa:v(57,"Alta",["Renta de rotación 2 recámaras: CAD 2,155/mes (2025)","MBM familia de 4: ~CAD 58,803"],"CMA"),calgary:v(70,"Alta",["Renta de rotación 2 recámaras: CAD 1,836/mes","Oferta reciente alivió vacancia"],"CMA"),waterloo:v(68,"Alta",["Renta 2 recámaras: CAD 1,832; vacancia 4.1%","Presión estudiantil y tecnológica"],"CMA"),halifax:v(61,"Alta",["Renta de rotación 2 recámaras: CAD 2,058/mes","Carga alta frente al ingreso local"],"CMA"),moncton:v(86,"Alta",["Renta 2 recámaras: CAD 1,453; vacancia 4.2%","La opción más barata del grupo"],"CMA"),guadalajara:v(58,"Baja",["No hay renta oficial comparable a CMHC","Benchmark usa costo urbano e ingreso estatal"],"Ciudad / estado")}},
  {id:"purchasing",short:"Poder compra",name:"Poder adquisitivo y holgura",rank:5,description:"Ingreso después de vivienda y canasta básica, no sólo ingreso nominal.",benchmark:"Relación ingreso familiar / MBM y renta anual / ingreso; 100 representa holgura alta.",normalization:"Promedio de ingreso/MBM (0=1.0×, 100=2.0×) y carga de renta (100≤20%, 0≥45%).",sourceIds:["census21","rent25","mbm24"],values:{
    ottawa:v(78,"Media",["Ingreso alto, pero renta de entrada elevada","Buena absorción de shocks con dos ingresos"],"CMA"),calgary:v(86,"Media",["Mejor combinación de ingreso y renta","Volatilidad laboral reduce el score"],"CMA"),waterloo:v(75,"Media",["Ingreso sólido y vacancia mejorada","Propiedad y renta siguen presionadas"],"CMA"),halifax:v(62,"Media",["Renta cercana a Ottawa con salarios menores","Impuestos provinciales pesan"],"CMA / provincia"),moncton:v(73,"Media",["Menor ingreso, clara ventaja en renta","Mercado pequeño limita crecimiento"],"CMA"),guadalajara:v(49,"Baja",["Costo absoluto menor, poder de compra local menor","Cambio no captura informalidad"],"Ciudad / estado")}},
  {id:"video",short:"Video",name:"Empleabilidad: video y producción",rank:7,description:"Perspectiva de Job Bank y profundidad del mercado para edición, postproducción y AV.",benchmark:"Job Bank 2025–2027: Limited=40, Moderate=60, Good=80; ajuste por masa ocupacional.",normalization:"70% outlook ordinal y 30% tamaño relativo del empleo; proxy provincial cuando falta CMA.",sourceIds:["jobs"],values:{
    ottawa:v(77,"Alta",["NOC 51110: Moderate; ~1,010 ocupados","40% en gobierno federal; AV: Limited"],"CMA"),calgary:v(66,"Media",["NOC 51110 Alberta: Good","Videógrafos Calgary: Limited"],"CMA / provincia"),waterloo:v(54,"Media",["Menor masa de producción","Acceso secundario al corredor Toronto"],"Región"),halifax:v(59,"Media",["Nova Scotia: Moderate","Sector creativo compacto"],"Provincia"),moncton:v(43,"Baja",["New Brunswick: Undetermined","Bilingüismo ayuda, masa crítica baja"],"Provincia"),guadalajara:v(69,"Baja",["Mercado audiovisual mayor en volumen","No hay clasificación NOC comparable"],"Área metropolitana")}},
  {id:"marketing",short:"Marketing",name:"Marketing y enseñanza de idiomas",rank:8,description:"Oportunidad conjunta para marketing/PR y docencia de idiomas sin licencia escolar.",benchmark:"Promedio de outlooks NOC 11202 y 41210; escala ordinal 20–100.",normalization:"Media de ambos outlooks; ajuste por tamaño de mercado y exigencia de credenciales.",sourceIds:["jobs"],values:{
    ottawa:v(66,"Alta",["Marketing/PR: Limited; instructores: Limited","Bilingüismo eleva encaje"],"CMA"),calgary:v(72,"Alta",["Mercado corporativo amplio","Instructores: Moderate"],"CMA"),waterloo:v(60,"Media",["Marketing/PR: Limited","Demanda tecnológica, competencia elevada"],"Región"),halifax:v(65,"Alta",["Marketing/PR: Moderate","Idiomas: salario mediano CAD 37.60/h"],"CMA"),moncton:v(68,"Media",["Marketing/PR: Moderate","Ventaja bilingüe; mercado pequeño"],"Región"),guadalajara:v(64,"Baja",["Mercado amplio, menor salario y formalidad","Benchmark de encaje"],"Área metropolitana")}},
  {id:"security",short:"Seguridad",name:"Crimen grave y cotidiano",rank:2,description:"Severidad del crimen y frecuencia reportada, separando percepción de victimización.",benchmark:"Canadá 2025: CSI 75.0 y tasa 5,585 por 100 mil.",normalization:"70% CSI inverso (100≤40; 0≥130) y 30% tasa inversa (100≤3,000; 0≥9,000).",sourceIds:["crime25","gdlcrime"],values:{
    ottawa:v(securityScore(50.6,4212),"Alta",["CSI 50.6; tasa 4,212/100 mil","CSI cayó 6%"],"Parte Ontario CMA"),calgary:v(securityScore(61.7,5038),"Alta",["CSI 61.7; tasa 5,038/100 mil","CSI cayó 3%"],"CMA"),waterloo:v(securityScore(66.8,5083),"Alta",["CSI 66.8; tasa 5,083/100 mil","CSI cayó 9%"],"CMA"),halifax:v(securityScore(68.6,6094),"Alta",["CSI 68.6; tasa 6,094/100 mil","Más delito frecuente que Canadá"],"CMA"),moncton:v(securityScore(105.6,7561),"Alta",["CSI 105.6; tasa 7,561/100 mil","CSI subió 11%"],"CMA"),guadalajara:v(24,"Media",["64.7% percibía insegura la ciudad","Hogares: robo 19.6%; extorsión 17.2%"],"AMG; definición no comparable")}},
  {id:"health",short:"Salud",name:"Acceso y capacidad sanitaria",rank:6,description:"Proveedor regular, necesidades no atendidas y dificultad para recién llegados.",benchmark:"Canadá: 88.8% de menores con proveedor; 9.2% con necesidad no atendida.",normalization:"60% proveedor regular y 40% necesidad no atendida; proxy provincial con ajuste newcomer.",sourceIds:["health24","unmet22"],values:{
    ottawa:v(81,"Media",["Ontario: 87.6% de adultos con proveedor","Necesidad no atendida 8.5%; newcomers 75.2%"],"Provincia"),calgary:v(74,"Media",["Alberta: 85.4% con proveedor","No atendida 9.4%; newcomers Prairies 78.7%"],"Provincia / región"),waterloo:v(78,"Media",["Indicadores provinciales de Ontario","Capacidad local puede diferir"],"Provincia"),halifax:v(57,"Media",["Nova Scotia: 79.2% con proveedor","No atendida 13.7%; newcomers Atlantic 41%"],"Provincia / región"),moncton:v(53,"Media",["New Brunswick: no atendida 12.1%","Newcomers Atlantic con proveedor 41%"],"Provincia / región"),guadalajara:v(47,"Baja",["Afiliación a salud: 70.1% (2020)","No equivale a proveedor regular"],"Municipio")}},
  {id:"education",short:"Educación",name:"Educación y movilidad social",rank:9,description:"Resultados educativos, capital humano y movilidad intergeneracional.",benchmark:"Canadá PIAAC alfabetización 271; PISA y movilidad usan referencia nacional.",normalization:"45% PIAAC, 35% PISA, 20% movilidad intergeneracional; 50≈Canadá.",sourceIds:["piaac22","pisa22","mobility","gdlcensus"],values:{
    ottawa:v(83,"Media",["Ontario PIAAC: 269","Alta concentración universitaria"],"Provincia / CMA"),calgary:v(87,"Media",["Alberta PIAAC: 276","Alberta superó promedio PISA inglés"],"Provincia"),waterloo:v(84,"Media",["Ontario PIAAC: 269","35.4% con licenciatura o más"],"Provincia / CMA"),halifax:v(78,"Media",["Nova Scotia PIAAC: 272","Movilidad Atlantic favorable"],"Provincia"),moncton:v(69,"Media",["New Brunswick PIAAC: 264","Movilidad favorable; resultados débiles"],"Provincia"),guadalajara:v(56,"Baja",["30.7% con educación superior","Sin equivalencia ciudad PIAAC/PISA"],"Municipio")}},
  {id:"water",short:"Agua",name:"Seguridad hídrica",rank:1,description:"Disponibilidad, diversificación de fuentes, estrés y planificación de largo plazo.",benchmark:"Estrés físico 50%, redundancia 25%, plan con metas 25%; referencias hidrológicas locales.",normalization:"Rúbrica publicada 0–100; no hay un indicador municipal canadiense único comparable.",sourceIds:["ottwater","calwater","watwater","monwater","gdlwater"],values:{
    ottawa:v(84,"Media",["Fuente superficial abundante; plan 2025","Riesgo principal: inundación, no escasez"],"Municipal"),calgary:v(59,"Alta",["Dos ríos pequeños para una gran ciudad","Metas 2040: <908 ML/día y <233,000 ML/año"],"Municipal"),waterloo:v(67,"Alta",[">100 pozos + Grand River","Estrategia de suministro a 2051"],"Regional"),halifax:v(83,"Media",["Múltiples cuencas y abundancia relativa","Tormentas y cortes son riesgo operativo"],"Regional"),moncton:v(86,"Media",["Plan 2025 con 77 acciones","Objetivo 100% cumplimiento potable"],"Municipal"),guadalajara:v(23,"Alta",["Atemajac: déficit −12.679 hm³/año","Toluquilla −75.614; Cajititlán −16.945"],"Acuíferos metropolitanos")}},
  {id:"climate",short:"Clima",name:"Clima estacional y habitabilidad",rank:12,description:"Carga térmica, precipitación, nieve y variación estacional; preferencia se separa de clima físico.",benchmark:"Normales ECCC 1991–2020; score reduce extremos y premia estaciones manejables.",normalization:"Grados-día y días extremos normalizados a grandes ciudades canadienses.",sourceIds:["climate"],values:{
    ottawa:v(58,"Alta",["Inviernos fríos y veranos húmedos","Cuatro estaciones; nieve relevante"],"Estación representativa"),calgary:v(65,"Alta",["Frío seco, chinooks y variabilidad","Más sol; riesgo de granizo"],"Estación representativa"),waterloo:v(68,"Alta",["Invierno menos severo que Ottawa","Verano cálido-húmedo"],"Estación representativa"),halifax:v(74,"Alta",["Invierno moderado por Atlántico","Más lluvia, viento y tormentas"],"Estación representativa"),moncton:v(64,"Alta",["Invierno nevado; verano moderado","Mayor amplitud que Halifax"],"Estación representativa"),guadalajara:v(91,"Media",["Templado la mayor parte del año","Lluvia concentrada en verano"],"Estación SMN")}},
  {id:"risk",short:"Riesgo clima",name:"Riesgos climáticos e insurabilidad",rank:10,description:"Exposición a inundación, incendios, granizo, huracanes, terremoto y pérdidas aseguradas.",benchmark:"National Risk Profile + pérdidas aseguradas; 100 significa exposición y presión bajas.",normalization:"50% peligros, 30% pérdidas/seguro, 20% adaptación; mezcla ciudad-provincia.",sourceIds:["ibc","risk","ottwater","monwater"],values:{
    ottawa:v(66,"Media",["Inundación, tornados y sismo moderado","Plan de adaptación financiado"],"Municipal / regional"),calgary:v(49,"Alta",["Granizo agosto 2024: ~CAD 3 mil millones","Inundación, humo e incendios"],"CMA / provincia"),waterloo:v(71,"Media",["Inundación y calor; sin costa","Presión de seguro moderada"],"Regional"),halifax:v(47,"Alta",["Huracanes, marejada y viento","Exposición costera estructural"],"Regional"),moncton:v(57,"Media",["Inundación, hielo y tormentas","Plan 2025 mejora preparación"],"Municipal"),guadalajara:v(43,"Baja",["Sequía, calor, inundación y sismo","Baja penetración de seguro"],"Metropolitana / estatal")}},
  {id:"crisis",short:"Crisis",name:"Respuesta integral a crisis (COVID)",rank:11,description:"Stress test económico, laboral, sanitario y de recuperación; no sólo mortalidad.",benchmark:"Canadá: PIB real −5.3% en 2020; 2021 a 99.7% del nivel 2019.",normalization:"45% caída PIB, 30% recuperación, 15% empleo regional, 10% presión sanitaria; proxy provincial.",sourceIds:["covidgdp","jaliscoGDP"],values:{
    ottawa:v(82,"Media",["Ontario PIB 2020: −5.0%; índice 2021: 100.3","Empleo público amortiguó shock"],"Provincia / CMA"),calgary:v(59,"Media",["Alberta PIB: −8.2%; índice 2021: 96.4","Recuperación empleo regional: 63%"],"Provincia / región"),waterloo:v(78,"Media",["Ontario: −5.0%; recuperación a 100.3","Tecnología amortiguó"],"Provincia / región"),halifax:v(87,"Media",["Nova Scotia: −3.2%; índice 102.5","Recuperación empleo: 107%"],"Provincia / región"),moncton:v(89,"Media",["New Brunswick: −3.7%; índice 103.1","Recuperación empleo: 159%"],"Provincia / región"),guadalajara:v(44,"Media",["Jalisco PIB 2020: −8.1%","Rebote 2021: +5.4%"],"Estado")}},
  {id:"transport",short:"Movilidad",name:"Transporte y forma urbana",rank:13,description:"Capacidad de vivir con un auto o sin él, densidad central y acceso regional.",benchmark:"Canadá urbano: modo de viaje y densidad central; 2021 tiene cautela por teletrabajo.",normalization:"50% transporte activo/colectivo, 30% densidad central, 20% conectividad regional.",sourceIds:["census21","urban"],values:{
    ottawa:v(81,"Alta",["Transporte público ~9.7% de commuters","Downtown 6,847/km²; LRT en expansión"],"CMA"),calgary:v(74,"Alta",["Downtown 7,778/km²","Buen CTrain; auto fuera de corredores"],"CMA"),waterloo:v(76,"Alta",["Downtown Kitchener 3,746/km²","ION LRT conecta tres núcleos"],"CMA"),halifax:v(63,"Media",["Downtown 6,237/km²","Cuellos peninsulares; buses/ferries"],"CMA"),moncton:v(46,"Media",["Downtown 1,795/km²","Alta dependencia del auto"],"CMA"),guadalajara:v(65,"Media",["Tren ligero y BRT extensos","Congestión y seguridad peatonal"],"Área metropolitana")}},
  {id:"integration",short:"Integración",name:"Demografía e integración",rank:14,description:"Masa crítica inmigrante, edad, bilingüismo y capacidad de formar redes.",benchmark:"Censo 2021: inmigración, bilingüismo oficial y estructura por edad.",normalization:"40% diversidad, 30% bilingüismo, 20% edad, 10% crecimiento; no mide aceptación individual.",sourceIds:["census21"],values:{
    ottawa:v(93,"Alta",["Gran comunidad inmigrante y ecosistema federal","Inglés/francés aporta ventaja"],"CMA"),calgary:v(88,"Alta",["Alta diversidad y crecimiento","Menor utilidad cotidiana del francés"],"CMA"),waterloo:v(83,"Alta",["Inmigrantes 25.8%; edad mediana 38.0","Universidades apoyan integración"],"CMA"),halifax:v(76,"Alta",["Crecimiento reciente y universidades","Red laboral más pequeña"],"CMA"),moncton:v(73,"Alta",["Bilingüismo distintivo","Menor masa crítica"],"CMA"),guadalajara:v(62,"Baja",["Red cultural propia alta","No es medición migrante comparable"],"Área metropolitana")}},
  {id:"nature",short:"Naturaleza",name:"Naturaleza y espacio verde",rank:15,description:"Verdor urbano, acceso cercano a parques y variedad regional.",benchmark:"Canadá 2022: 72% de superficie urbana verde; grandes centros 65%.",normalization:"70% verdor satelital y 30% acceso a parque; 2019–2022.",sourceIds:["green"],values:{
    ottawa:v(89,"Alta",["91% reportó espacio verde cercano","Greenbelt y ríos"],"CMA"),calgary:v(75,"Alta",["Verdor ~42%; parque cercano 88%","Acceso excepcional a Rockies"],"CMA"),waterloo:v(78,"Alta",["Parque cercano 89%","Senderos y Grand River"],"CMA"),halifax:v(96,"Alta",["Verdor ~90%; parque cercano 92%","Costa, bosque y lagos"],"CMA"),moncton:v(92,"Alta",["Verdor 91.5%; parque cercano 93%","Costa y parques regionales"],"CMA"),guadalajara:v(68,"Baja",["Bosque La Primavera y barrancas","Cobertura intraurbana desigual"],"Área metropolitana")}},
  {id:"systems",short:"Sistemas",name:"Resiliencia energética y alimentaria",rank:16,description:"Diversidad de generación, interconexión y base agroalimentaria regional.",benchmark:"Canadá: 63.9% electricidad renovable en 2024; producción agrícola como buffer.",normalization:"55% diversidad/limpieza/interconexión eléctrica y 45% producción + conectividad alimentaria; proxy provincial.",sourceIds:["energy","food"],values:{
    ottawa:v(84,"Media",["Ontario: red baja en carbono e interconectada","Agricultura provincial CAD 23.49bn"],"Provincia"),calgary:v(73,"Media",["Gran base energética, red más fósil","Agricultura CAD 24.45bn"],"Provincia"),waterloo:v(85,"Media",["Fortaleza eléctrica de Ontario","Cercanía a gran base agrícola"],"Provincia"),halifax:v(66,"Media",["Red más aislada y fósil","Agricultura CAD 826m"],"Provincia"),moncton:v(75,"Media",["NB: nuclear 40%, fósil 27%, hidro 23%","Agricultura CAD 1.326bn"],"Provincia"),guadalajara:v(54,"Baja",["Jalisco es potencia agroalimentaria","Agua y calor concentran riesgo"],"Estado")}},
];

type CategoryValue={score:number;confidence:Confidence;facts:string[];geography?:string};
const expansionValues:Record<string,Record<NewCityId,CategoryValue>>={
  economy:{
    toronto:v(80,"Alta",["Desempleo CMA: 6.7% (julio de 2026)","Ingreso familiar mediano después de impuestos: CAD 85,000 (2020)"],"CMA"),
    vancouver:v(75,"Alta",["Desempleo CMA: 6.0% (julio de 2026)","Ingreso familiar mediano después de impuestos: CAD 79,500 (2020)"],"CMA"),
    montreal:v(70,"Alta",["Desempleo CMA: 6.6% (julio de 2026)","Ingreso familiar mediano después de impuestos: CAD 65,500 (2020)"],"CMA"),
    quebec:v(82,"Media",["Desempleo CMA: ~4.0% en el trimestre móvil de 2026","Ingreso familiar mediano después de impuestos: CAD 65,500 (2020)"],"CMA; desempleo trimestral"),
    victoria:v(76,"Media",["Desempleo CMA: ~4.6% en el trimestre móvil de 2026","Ingreso familiar mediano después de impuestos: CAD 75,500 (2020)"],"CMA; desempleo trimestral"),
    winnipeg:v(75,"Media",["Desempleo CMA: ~5.6% en el trimestre móvil de 2026","Ingreso familiar mediano después de impuestos: CAD 71,500 (2020)"],"CMA; desempleo trimestral")
  },
  housing:{
    toronto:v(42,"Alta",["Renta de rotación 2 recámaras: CAD 2,547/mes (2025)","Vacancia purpose-built: 3.0%"],"CMA"),
    vancouver:v(28,"Alta",["Renta de rotación 2 recámaras: CAD 2,696/mes (2025)","Vacancia purpose-built: 3.7%"],"CMA"),
    montreal:v(78,"Alta",["Renta de rotación 2 recámaras: CAD 1,644/mes (2025)","Vacancia purpose-built: 2.9%"],"CMA"),
    quebec:v(92,"Media",["Renta promedio 2 recámaras: CAD 1,277/mes (2025)","Vacancia purpose-built: 2.4%; renta promedio, no de rotación"],"CMA; medida de renta no idéntica"),
    victoria:v(50,"Media",["Renta promedio 2 recámaras: CAD 2,120/mes (2025)","Vacancia purpose-built: 3.3%; renta promedio, no de rotación"],"CMA; medida de renta no idéntica"),
    winnipeg:v(88,"Media",["Renta promedio 2 recámaras: CAD 1,571/mes (2025)","Vacancia purpose-built: 2.8%; renta promedio, no de rotación"],"CMA; medida de renta no idéntica")
  },
  purchasing:{
    toronto:v(55,"Media",["Ingreso mediano alto frente a Canadá","La renta de rotación absorbe cerca de 36% del ingreso mediano familiar bruto equivalente"],"CMA; cálculo renta/ingreso"),
    vancouver:v(38,"Media",["Renta de rotación más alta del grupo ampliado","Ingreso mediano inferior al de Toronto y Ottawa"],"CMA; cálculo renta/ingreso"),
    montreal:v(70,"Media",["Renta de rotación 36% menor que Toronto","Ingreso mediano también menor; la ventaja neta persiste"],"CMA; cálculo renta/ingreso"),
    quebec:v(86,"Media",["Renta promedio baja frente al ingreso mediano","Desempleo reducido sostiene la holgura, con cautela por definición de renta"],"CMA; medida mixta"),
    victoria:v(55,"Media",["Ingreso mediano CAD 75,500","Renta promedio 2 recámaras CAD 2,120 limita la holgura"],"CMA; medida mixta"),
    winnipeg:v(80,"Media",["Ingreso mediano CAD 71,500","Renta promedio 2 recámaras CAD 1,571 favorece la holgura"],"CMA; medida mixta")
  },
  video:{
    toronto:v(88,"Alta",["Productores/directores NOC 51120: ~11,270 ocupados","Outlook 2025–2027: Limited; gran masa crítica compensa parcialmente"],"Región de Toronto"),
    vancouver:v(86,"Media",["Mercado de productores se proyecta balanceado","AV technicians: ~1,830; outlook Very limited"],"Región de Vancouver"),
    montreal:v(83,"Alta",["Productores/directores: ~7,830 ocupados; outlook Limited","AV technicians: ~8,350; outlook Very limited"],"Región de Montréal"),
    quebec:v(60,"Alta",["Productores/directores: outlook Moderate","Mercado regional menor que Montréal"],"Capitale-Nationale"),
    victoria:v(52,"Baja",["Mercado audiovisual local de escala pequeña","Acceso indirecto al ecosistema de British Columbia"],"CMA / provincia"),
    winnipeg:v(48,"Media",["Camera operators: ~150 ocupados","Outlook 2025–2027: Limited"],"Región de Winnipeg")
  },
  marketing:{
    toronto:v(82,"Media",["Mayor profundidad corporativa del grupo","Competencia elevada en marketing y docencia de idiomas"],"CMA / provincia"),
    vancouver:v(82,"Media",["Mercado grande y diverso","Demanda de idiomas amplia; vivienda reduce atractivo neto"],"CMA / provincia"),
    montreal:v(78,"Media",["Mercado grande y bilingüe","Francés es requisito frecuente y ventaja para docencia"],"CMA / provincia"),
    quebec:v(72,"Media",["Bilingüismo aporta encaje en idiomas","Mercado de marketing menor y predominantemente francófono"],"CMA / provincia"),
    victoria:v(60,"Media",["Mercado de servicios y gobierno provincial","Menor masa crítica que Vancouver"],"CMA / provincia"),
    winnipeg:v(64,"Media",["Mercado regional diversificado","Escala menor que Toronto, Vancouver y Montréal"],"CMA / provincia")
  },
  security:{
    toronto:v(securityScore(55,3950),"Alta",["CSI 55.0 en 2025","Tasa reportada: 3,950 por 100 mil"],"CMA"),
    vancouver:v(securityScore(83.5,5672),"Alta",["CSI 83.5 en 2025","Tasa reportada: 5,672 por 100 mil"],"CMA"),
    montreal:v(securityScore(61.3,3641),"Alta",["CSI 61.3 en 2025","Tasa reportada: 3,641 por 100 mil"],"CMA"),
    quebec:v(securityScore(55,3493),"Alta",["CSI 55.0 en 2025","Tasa reportada: 3,493 por 100 mil"],"CMA"),
    victoria:v(securityScore(74.6,5588),"Alta",["CSI 74.6 en 2025","Tasa reportada: 5,588 por 100 mil"],"CMA"),
    winnipeg:v(securityScore(113.4,7899),"Alta",["CSI 113.4 en 2025","Tasa reportada: 7,899 por 100 mil"],"CMA")
  },
  health:{
    toronto:v(81,"Media",["Ontario: necesidad no atendida 8.5%","Acceso a proveedor regular usa proxy provincial"],"Provincia; ajuste metropolitano"),
    vancouver:v(65,"Media",["British Columbia: necesidad no atendida 10.9%","Capacidad especializada alta, acceso primario tensionado"],"Provincia; ajuste metropolitano"),
    montreal:v(76,"Media",["Québec: necesidad no atendida 8.7%","Acceso a proveedor regular usa proxy provincial"],"Provincia; ajuste metropolitano"),
    quebec:v(76,"Media",["Québec: necesidad no atendida 8.7%","Indicador comparable disponible a nivel provincial"],"Provincia"),
    victoria:v(65,"Media",["British Columbia: necesidad no atendida 10.9%","Indicador comparable disponible a nivel provincial"],"Provincia"),
    winnipeg:v(80,"Media",["Manitoba: necesidad no atendida 7.7%","Indicador comparable disponible a nivel provincial"],"Provincia")
  },
  education:{
    toronto:v(85,"Media",["Ontario PIAAC alfabetización: 269","Ontario se ubica alrededor del promedio canadiense en PISA"],"Provincia / CMA"),
    vancouver:v(92,"Media",["British Columbia PIAAC: 281","BC se ubica alrededor del promedio canadiense en PISA"],"Provincia / CMA"),
    montreal:v(88,"Media",["Québec PIAAC: 267","Québec superó el promedio canadiense en PISA 2022"],"Provincia / CMA"),
    quebec:v(86,"Media",["Québec PIAAC: 267","Québec superó el promedio canadiense en PISA 2022"],"Provincia / CMA"),
    victoria:v(88,"Media",["British Columbia PIAAC: 281","Resultados PISA provinciales sólidos"],"Provincia / CMA"),
    winnipeg:v(76,"Media",["Manitoba PIAAC: 269","PISA provincial generalmente por debajo del promedio canadiense"],"Provincia / CMA")
  },
  water:{
    toronto:v(88,"Alta",["Lake Ontario abastece el sistema municipal","Toronto trata cerca de 435 mil millones de litros al año y reporta cumplimiento sostenido"],"Municipal"),
    vancouver:v(65,"Alta",["Agua de alta calidad históricamente abundante","Crecimiento y sequía estacional presionan el suministro en verano"],"Municipal / regional"),
    montreal:v(89,"Alta",["Estrategia hídrica 2025–2034 con 16 objetivos","Red abundante; lluvia extrema e infraestructura envejecida concentran el riesgo"],"Municipal"),
    quebec:v(82,"Alta",["Consumo bajó ~18% entre 2006 y 2024","Población creció ~16% en el mismo periodo; persiste presión de picos y fuentes"],"Municipal"),
    victoria:v(69,"Alta",["Sooke Lake aporta cerca de 90% del almacenamiento","Sistema depende de lluvia invernal almacenada para los veranos secos"],"Regional"),
    winnipeg:v(78,"Alta",["Shoal Lake es la fuente principal, conectada por acueducto por gravedad","Fuente grande y protegida, pero concentrada en un solo sistema distante"],"Municipal / regional")
  },
  climate:{
    toronto:v(72,"Alta",["Invierno frío pero menos severo que Ottawa o Winnipeg","Verano cálido y húmedo; efecto de Lake Ontario"],"Estación representativa"),
    vancouver:v(88,"Alta",["Invierno más templado entre las grandes ciudades canadienses","Verano seco; temporada húmeda y gris prolongada"],"Estación representativa"),
    montreal:v(60,"Alta",["Invierno frío y nevado","Verano cálido y húmedo con alta amplitud estacional"],"Estación representativa"),
    quebec:v(55,"Alta",["Invierno largo, frío y nevado","Verano moderadamente cálido y húmedo"],"Estación representativa"),
    victoria:v(94,"Alta",["Invierno suave para estándares canadienses","Verano seco y templado; menor carga térmica anual"],"Estación representativa"),
    winnipeg:v(42,"Alta",["Invierno muy frío y ventoso","Verano cálido; una de las mayores amplitudes estacionales"],"Estación representativa")
  },
  risk:{
    toronto:v(55,"Media",["Inundación pluvial, calor y tormentas convectivas","Alta concentración de activos eleva pérdidas potenciales"],"Municipal / provincial"),
    vancouver:v(42,"Alta",["Sismo, inundación, calor, humo y sequía","Adaptación municipal incluye lluvia extrema y aumento del nivel del mar"],"Municipal / regional"),
    montreal:v(58,"Alta",["Lluvia extrema, inundación y calor urbano","La ciudad proyecta multiplicación del riesgo por lluvias intensas"],"Municipal"),
    quebec:v(70,"Media",["Inundación, hielo y erosión fluvial","Menor concentración de pérdidas que Montréal o Toronto"],"Municipal / provincial"),
    victoria:v(52,"Media",["Sismo y aumento del nivel del mar son riesgos estructurales","Incendio, humo y sequía estival presionan la región"],"Regional / provincial"),
    winnipeg:v(50,"Alta",["Inundación, calor extremo, sequía y lluvia intensa","Plan local también identifica ciclos de congelamiento y deshielo"],"Municipal / regional")
  },
  crisis:{
    toronto:v(76,"Media",["Ontario PIB real 2020: −5.0%","Índice PIB 2021: 100.3 respecto a 2019=100"],"Provincia / CMA"),
    vancouver:v(84,"Media",["British Columbia PIB real 2020: −3.8%","Índice PIB 2021: 103.0 respecto a 2019=100"],"Provincia / CMA"),
    montreal:v(82,"Media",["Québec PIB real 2020: −5.3%","Índice PIB 2021: 100.7 respecto a 2019=100"],"Provincia / CMA"),
    quebec:v(84,"Media",["Québec PIB real 2020: −5.3%","Recuperación provincial superó el nivel de 2019 en 2021"],"Provincia / CMA"),
    victoria:v(84,"Media",["British Columbia PIB real 2020: −3.8%","Índice PIB 2021: 103.0 respecto a 2019=100"],"Provincia / CMA"),
    winnipeg:v(72,"Media",["Manitoba PIB real 2020: −4.8%","Índice PIB 2021: 97.2 respecto a 2019=100"],"Provincia / CMA")
  },
  transport:{
    toronto:v(95,"Alta",["Red regional de metro, tranvía, buses y tren GO","Alta densidad central y mayor viabilidad sin auto"],"CMA"),
    vancouver:v(91,"Alta",["SkyTrain, buses y SeaBus forman red metropolitana","Alta proporción de viajes activos y colectivos"],"CMA"),
    montreal:v(93,"Alta",["Metro, buses y tren regional sostienen vida sin auto","Forma urbana densa; expansión REM"],"CMA"),
    quebec:v(60,"Media",["Red de buses estructurada","Menor densidad y mayor dependencia del auto fuera del centro"],"CMA"),
    victoria:v(72,"Media",["Alta caminabilidad y ciclismo en el núcleo","Sin tren urbano; buses y ferries conectan la región"],"CMA"),
    winnipeg:v(58,"Media",["Red de buses y corredor rápido","Expansión baja y clima elevan dependencia del auto"],"CMA")
  },
  integration:{
    toronto:v(97,"Alta",["Inmigrantes: 46.6% de la población en 2021","Mayor masa crítica de comunidades migrantes del grupo"],"CMA"),
    vancouver:v(98,"Alta",["Inmigrantes: 41.8% de la población en 2021","Amplia diversidad lingüística y redes de llegada"],"CMA"),
    montreal:v(94,"Alta",["Inmigrantes: 24.3% de la población en 2021","Ecosistema bilingüe amplio; francés es central"],"CMA"),
    quebec:v(70,"Alta",["Inmigrantes: 6.7% de la población en 2021","Menor masa crítica; francés es esencial para integración"],"CMA"),
    victoria:v(77,"Alta",["Inmigrantes: 18.9% de la población en 2021","Red más pequeña que Vancouver"],"CMA"),
    winnipeg:v(80,"Alta",["Inmigrantes: 25.4% de la población en 2021","Diversidad alta para su escala metropolitana"],"CMA")
  },
  nature:{
    toronto:v(70,"Media",["Sistema de ravines y costa de Lake Ontario","Acceso regional amplio, cobertura verde intraurbana desigual"],"CMA"),
    vancouver:v(97,"Alta",["Costa, montañas y parques accesibles desde la ciudad","Verdor urbano y acceso recreativo regional excepcionales"],"CMA"),
    montreal:v(77,"Media",["Mont Royal, río y red de parques","Acceso regional sólido, menor variedad inmediata que la costa del Pacífico"],"CMA"),
    quebec:v(91,"Alta",["Río, bosques y parques regionales cercanos","Alta proximidad a naturaleza fuera del núcleo"],"CMA"),
    victoria:v(99,"Alta",["Costa del Pacífico, bosque y parques regionales","Acceso cotidiano a naturaleza excepcional"],"CMA"),
    winnipeg:v(74,"Media",["Ríos, parques y acceso lacustre regional","Cobertura verde estacional y menor variedad topográfica"],"CMA")
  },
  systems:{
    toronto:v(84,"Media",["Ontario combina nuclear, hidro e interconexiones","Gran base agroalimentaria provincial y logística nacional"],"Provincia / CMA"),
    vancouver:v(85,"Media",["British Columbia depende ampliamente de hidroelectricidad","Puerto y producción provincial diversifican abastecimiento"],"Provincia / CMA"),
    montreal:v(92,"Media",["Québec tiene sistema eléctrico predominantemente hidroeléctrico","Base agroalimentaria provincial y gran nodo logístico"],"Provincia / CMA"),
    quebec:v(92,"Media",["Québec tiene sistema eléctrico predominantemente hidroeléctrico","Proximidad a producción agroalimentaria provincial"],"Provincia / CMA"),
    victoria:v(78,"Media",["Electricidad provincial baja en carbono","Dependencia insular y logística de ferries reducen redundancia alimentaria"],"Provincia / región"),
    winnipeg:v(88,"Media",["Manitoba depende ampliamente de hidroelectricidad","Gran base agrícola y ubicación logística central"],"Provincia / CMA")
  }
};

for(const category of categories){
  Object.assign(category.values,expansionValues[category.id]);
}

const sourceAdditions:Record<string,string[]>={
  water:["torwater","vanwater","mtlwater","qcwater","vicwater","winwater"],
  risk:["vanadapt","mtlwater","winadapt"],
  video:["jobstor","jobsvan","jobsmtl","jobsqc","jobswin"]
};
for(const category of categories){
  if(sourceAdditions[category.id]) category.sourceIds.push(...sourceAdditions[category.id]);
}

export const modelMeta={version:"0.4.0",snapshot:"27 agosto 2026",title:"Índice de Resiliencia para Migrar",subtitle:"Once ciudades canadienses, con Guadalajara como punto de partida",caveat:"Modelo de apoyo a la decisión; no es un índice oficial ni una probabilidad estadística."};
