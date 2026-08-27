# Metodología — Índice de Resiliencia para Migrar

**Versión:** 0.1.0  
**Corte:** 27 de agosto de 2026

Compara Ottawa, Calgary, Kitchener–Waterloo, Halifax y Moncton–Dieppe. Guadalajara es benchmark de origen y no participa en el ranking canadiense. Es apoyo a la decisión, no un índice oficial ni una probabilidad estadística.

## Normalización

Cuando existe una métrica comparable se usa una función lineal acotada:

- Mayor es mejor: `score = clamp(100 × (x − floor) / (target − floor))`
- Menor es mejor: `score = clamp(100 × (ceiling − x) / (ceiling − target))`

Pisos y objetivos se fijan con referencias canadienses o rangos metropolitanos publicados, no con el mínimo y máximo de estas cinco ciudades. Si no existe serie municipal se usa una rúbrica explícita o un proxy provincial/regional y baja la confianza.

## Pesos

El usuario asigna rangos únicos 1–16. Se convierten en pesos **Rank-Order Centroid (ROC)**: `peso(r) = (1/N) × Σ(j=r…N) 1/j`. Este método se usa cuando conocemos el orden de importancia, pero no una intensidad cardinal exacta. Con 16 categorías, las tres primeras reciben aproximadamente 21.1%, 14.9% y 11.7%; todas las categorías conservan peso y juntas suman 100%. El score final es la suma de `score de categoría × peso`.

## Calidad

- **Alta:** dato CMA/municipal reciente y comparable.
- **Media:** proxy provincial/regional o combinación oficial.
- **Baja:** definición transfronteriza imperfecta, dato antiguo o evidencia incompleta.

COVID integra caída del PIB, recuperación, empleo y presión sanitaria. Seguridad usa CSI en Canadá; Guadalajara usa victimización/percepción y queda marcada como no equivalente. Salud, energía, alimentación, educación y movilidad social dependen parcialmente de proxies provinciales.

## Actualización

1. Sustituir valores/años en `lib/model-data.ts` y conservar URL, geografía y confianza.
2. Documentar cambios de fórmula con nueva versión.
3. Ejecutar `npm run validate:data`, `npm run lint` y `npm run build`.
4. Registrar el cambio en Git.
