# Norte — Índice de Resiliencia para Migrar

Visualizador interactivo y auditable para comparar once destinos canadienses con Guadalajara como benchmark.

**Sitio público:** [hradillo.github.io/norte-indice-migratorio](https://hradillo.github.io/norte-indice-migratorio/)

- 16 categorías cuantitativas.
- Ranking en vivo al reordenar prioridades 1–16.
- Fuente, año, geografía y confianza visibles.
- Guadalajara no altera el ranking canadiense.
- Método documentado en [METHODOLOGY.md](./METHODOLOGY.md).

## Ejecutar y validar

```bash
npm install
npm run dev
npm run validate:data
npm run lint
npm run build
npm run build:pages
```

Los datos están en `lib/model-data.ts`. No sustituye asesoría migratoria, legal, financiera o de seguros.

GitHub Pages se publica automáticamente desde `main` mediante GitHub Actions. El archivo local `.openai/hosting.json` contiene metadatos internos de la copia en Sites y no se publica en este repositorio.
