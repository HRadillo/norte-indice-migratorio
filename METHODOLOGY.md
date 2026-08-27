# Metodología — Índice de Resiliencia para Migrar

**Versión:** 0.3.1
**Corte:** 27 de agosto de 2026

Compara Ottawa, Calgary, Kitchener–Waterloo, Halifax, Moncton–Dieppe, Toronto, Vancouver, Montréal, Québec City, Victoria y Winnipeg. Guadalajara es benchmark de origen y no participa en el ranking canadiense. Es apoyo a la decisión, no un índice oficial ni una probabilidad estadística.

## Normalización

Cuando existe una métrica comparable se usa una función lineal acotada:

- Mayor es mejor: `score = clamp(100 × (x − floor) / (target − floor))`
- Menor es mejor: `score = clamp(100 × (ceiling − x) / (ceiling − target))`

Pisos y objetivos se fijan con referencias canadienses o rangos metropolitanos publicados, no con el mínimo y máximo de las ciudades candidatas. Si no existe serie municipal se usa una rúbrica explícita o un proxy provincial/regional y baja la confianza.

## Pesos

El usuario asigna rangos únicos 1–16. Se convierten en pesos **Rank-Order Centroid (ROC)**: `peso(r) = (1/N) × Σ(j=r…N) 1/j`. Este método se usa cuando conocemos el orden de importancia, pero no una intensidad cardinal exacta. Con 16 categorías, las tres primeras reciben aproximadamente 21.1%, 14.9% y 11.7%; todas las categorías conservan peso y juntas suman 100%. El score final es la suma de `score de categoría × peso`.

## Calidad

- **Alta:** dato CMA/municipal reciente y comparable.
- **Media:** proxy provincial/regional o combinación oficial.
- **Baja:** definición transfronteriza imperfecta, dato antiguo o evidencia incompleta.

COVID integra caída del PIB, recuperación, empleo y presión sanitaria. Seguridad usa CSI en Canadá; Guadalajara usa victimización/percepción y queda marcada como no equivalente. Salud, energía, alimentación, educación y movilidad social dependen parcialmente de proxies provinciales.

En seguridad canadiense, las notas se calculan directamente desde el CSI y la tasa policial de 2025 mediante la fórmula publicada. Guadalajara conserva una nota separada porque ENSU no mide la misma variable y no debe tratarse como equivalencia estadística.

En vivienda, CMHC publica renta de rotación de dos recámaras para algunos mercados y renta promedio para otros. La aplicación etiqueta cada medida y asigna confianza Media cuando no son idénticas. Nunca debe interpretarse una diferencia pequeña entre esos casos como precisión estadística.

## Alcance de los scores

Cada score es una **estimación de apoyo a la decisión, no una probabilidad estadísticamente establecida**. Las métricas comparables alimentan las fórmulas publicadas; cuando una categoría combina varias fuentes o no tiene serie municipal homogénea, se aplica la rúbrica declarada y se reduce la confianza. La interfaz conserva hechos, geografía, año y enlaces para que el usuario pueda auditar cada nota.

## Actualización

1. Sustituir valores/años en `lib/model-data.ts` y conservar URL, geografía y confianza.
2. Documentar cambios de fórmula con nueva versión.
3. Ejecutar `npm run validate:data`, `npm run lint` y `npm run build`.
4. Registrar el cambio en Git.
