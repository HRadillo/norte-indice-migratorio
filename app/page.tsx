"use client";
import React, { useMemo, useState } from "react";
import { categories, cities, modelMeta, sources } from "../lib/model-data";
const initialOrder = [...categories]
  .sort((a, b) => a.rank - b.rank)
  .map((c) => c.id);
const scoreColor = (s: number) =>
  s >= 80 ? "var(--good)" : s >= 65 ? "var(--mid)" : "var(--risk)";
const categoryEmoji: Record<string, string> = {
  economy: "💼",
  housing: "🏠",
  purchasing: "💳",
  video: "🎬",
  marketing: "📣",
  security: "🛡️",
  health: "🏥",
  education: "🎓",
  water: "💧",
  climate: "🌡️",
  risk: "⚠️",
  crisis: "🚨",
  transport: "🚇",
  integration: "🌎",
  nature: "🌲",
  systems: "⚡",
};

export default function Home() {
  const [order, setOrder] = useState(initialOrder),
    [selected, setSelected] = useState("water"),
    [view, setView] = useState<"ranking" | "matrix" | "sources">("ranking");
  const ranks = useMemo(
    () => Object.fromEntries(order.map((id, i) => [id, i + 1])),
    [order],
  );
  const weighted = useMemo(() => {
    const n = order.length,
      d = (n * (n + 1)) / 2;
    return cities
      .map((city) => ({
        ...city,
        score: categories.reduce(
          (sum, cat) =>
            sum + (cat.values[city.id].score * (n - ranks[cat.id] + 1)) / d,
          0,
        ),
      }))
      .sort((a, b) => b.score - a.score);
  }, [ranks, order.length]);
  const candidates = weighted.filter((c) => c.candidate),
    benchmark = weighted.find((c) => !c.candidate)!,
    cat = categories.find((c) => c.id === selected)!;
  const move = (id: string, dir: -1 | 1) =>
    setOrder((now) => {
      const a = [...now],
        i = a.indexOf(id),
        j = i + dir;
      if (j < 0 || j >= a.length) return now;
      [a[i], a[j]] = [a[j], a[i]];
      return a;
    });
  const setRank = (id: string, rank: number) =>
    setOrder((now) => {
      const a = now.filter((x) => x !== id);
      a.splice(Math.max(0, Math.min(a.length, rank - 1)), 0, id);
      return a;
    });
  return (
    <main>
      <header className="hero">
        <nav className="topbar">
          <div className="brand">
            <span className="brandmark">N</span>
            <span>Norte / Índice 2026</span>
          </div>
          <div className="version">
            Dataset v{modelMeta.version} · {modelMeta.snapshot}
          </div>
        </nav>
        <div className="hero-grid">
          <div>
            <p className="eyebrow">DECISIÓN MIGRATORIA · CANADÁ</p>
            <h1>{modelMeta.title}</h1>
            <p className="lede">
              {modelMeta.subtitle}. Datos oficiales, referencias explícitas y
              pesos que puedes reordenar.
            </p>
            <div className="tabs">
              {(
                [
                  ["ranking", "📊 Ranking"],
                  ["matrix", "🧭 Matriz"],
                  ["sources", "🔗 Fuentes"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  className={view === id ? "active" : ""}
                  onClick={() => setView(id)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="hero-note">
            <span>Cómo leerlo</span>
            <p>
              Los scores son transformaciones transparentes de métricas, no
              opiniones disfrazadas de precisión. Cada categoría expone dato,
              año, geografía y confianza.
            </p>
          </div>
        </div>
      </header>
      {view === "ranking" && (
        <>
          <section className="ranking-section shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow dark">RESULTADO ACTUAL</p>
                <h2>La prioridad cambia el destino</h2>
              </div>
              <p className="section-copy">
                Asigna 1 a lo más importante. El score se recalcula con pesos
                lineales y mantiene visible la incertidumbre.
              </p>
            </div>
            <div className="kpi-grid">
              <div className="kpi-card gradient-card">
                <span>🏆 Destino líder</span>
                <strong>{candidates[0].name}</strong>
                <small>Mejor equilibrio con el orden actual</small>
              </div>
              <div className="kpi-card ring-card">
                <div
                  className="score-ring"
                  style={
                    {
                      "--score": `${candidates[0].score * 3.6}deg`,
                    } as React.CSSProperties
                  }
                >
                  <b>{candidates[0].score.toFixed(1)}</b>
                </div>
                <span>Score ponderado</span>
              </div>
              <div className="kpi-card">
                <span>Brecha vs. origen</span>
                <strong>
                  +{(candidates[0].score - benchmark.score).toFixed(1)}
                </strong>
                <small>puntos sobre Guadalajara</small>
              </div>
              <div className="kpi-card">
                <span>Cobertura</span>
                <strong>16 × 6</strong>
                <small>categorías por lugares</small>
              </div>
            </div>
            <div className="ranking-grid">
              <div className="leaderboard">
                {candidates.map((city, i) => (
                  <div className="rank-row" key={city.id}>
                    <div className="rank-num">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="city-title">
                      <strong>{city.name}</strong>
                      <span>{city.province}</span>
                    </div>
                    <div className="bar-track">
                      <div
                        className="bar-fill"
                        style={{
                          width: `${city.score}%`,
                          background: city.color,
                        }}
                      />
                    </div>
                    <div className="total-score">{city.score.toFixed(1)}</div>
                  </div>
                ))}
                <div className="benchmark-row">
                  <span>Origen · no compite</span>
                  <strong>Guadalajara</strong>
                  <div className="bar-track">
                    <div
                      className="bar-fill hatch"
                      style={{ width: `${benchmark.score}%` }}
                    />
                  </div>
                  <b>{benchmark.score.toFixed(1)}</b>
                </div>
              </div>
              <aside className="decision-card">
                <p className="eyebrow">LECTURA ANALÍTICA</p>
                <h3>{candidates[0].name} lidera por equilibrio</h3>
                <p>
                  Con estas prioridades, su ventaja viene de agua, seguridad,
                  salud e integración. Calgary maximiza poder de compra; Halifax
                  y Moncton ganan peso cuando crisis y naturaleza suben.
                </p>
                <div className="confidence">
                  <span>Confianza global</span>
                  <strong>76%</strong>
                </div>
                <small>
                  La principal limitación es la mezcla de datos CMA,
                  provinciales y proxies ocupacionales.
                </small>
              </aside>
            </div>
          </section>
          <section className="weight-section">
            <div className="shell">
              <div className="section-heading">
                <div>
                  <p className="eyebrow dark">TU MODELO</p>
                  <h2>Ordena lo que más importa</h2>
                </div>
                <button
                  className="reset"
                  onClick={() => setOrder(initialOrder)}
                >
                  ↺ Restablecer prioridades
                </button>
              </div>
              <div className="weights-list">
                {order.map((id, i) => {
                  const c = categories.find((x) => x.id === id)!;
                  return (
                    <div className="weight-row" key={id}>
                      <select
                        aria-label={`Prioridad de ${c.name}`}
                        value={i + 1}
                        onChange={(e) => setRank(id, Number(e.target.value))}
                      >
                        {order.map((_, j) => (
                          <option key={j} value={j + 1}>
                            {j + 1}
                          </option>
                        ))}
                      </select>
                      <button
                        className="cat-name"
                        onClick={() => {
                          setSelected(id);
                          setView("matrix");
                        }}
                      >
                        <span>{categoryEmoji[c.id]} {c.short}</span>
                        <strong>{c.name}</strong>
                      </button>
                      <div className="weight-value">
                        {(
                          ((order.length - i) /
                            ((order.length * (order.length + 1)) / 2)) *
                          100
                        ).toFixed(1)}
                        %
                      </div>
                      <div className="arrows">
                        <button disabled={i === 0} onClick={() => move(id, -1)}>
                          ↑
                        </button>
                        <button
                          disabled={i === order.length - 1}
                          onClick={() => move(id, 1)}
                        >
                          ↓
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}
      {view === "matrix" && (
        <section className="shell matrix-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow dark">EVIDENCIA POR CATEGORÍA</p>
              <h2>Comparación sin caja negra</h2>
            </div>
            <p className="section-copy">
              Selecciona una fila para ver cifras, alcance geográfico y
              confianza.
            </p>
          </div>
          <div className="matrix-wrap">
            <table className="matrix">
              <thead>
                <tr>
                  <th>Categoría</th>
                  {cities.map((c) => (
                    <th key={c.id}>{c.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...categories]
                  .sort((a, b) => ranks[a.id] - ranks[b.id])
                  .map((c) => (
                    <tr
                      key={c.id}
                      className={selected === c.id ? "selected" : ""}
                      onClick={() => setSelected(c.id)}
                    >
                      <td>
                        <b>#{ranks[c.id]}</b> {categoryEmoji[c.id]} {c.short}
                      </td>
                      {cities.map((city) => (
                        <td key={city.id}>
                          <span
                            className="score-pill"
                            style={{
                              background: scoreColor(c.values[city.id].score),
                            }}
                          >
                            {c.values[city.id].score}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <article className="evidence-card">
            <div className="evidence-head">
              <div>
                <p className="eyebrow dark">{categoryEmoji[cat.id]} {cat.short}</p>
                <h3>{cat.name}</h3>
                <p>{cat.description}</p>
              </div>
              <div className="formula">
                <span>NORMALIZACIÓN</span>
                <p>{cat.normalization}</p>
              </div>
            </div>
            <p className="benchmark">
              <b>Benchmark:</b> {cat.benchmark}
            </p>
            <div className="city-facts">
              {cities.map((city) => {
                const item = cat.values[city.id];
                return (
                  <div key={city.id} className="fact-card">
                    <div>
                      <strong>{city.name}</strong>
                      <span
                        className={`quality q-${item.confidence.toLowerCase()}`}
                      >
                        {item.confidence}
                      </span>
                    </div>
                    <div className="fact-score">
                      {item.score}
                      <small>/100</small>
                    </div>
                    <ul>
                      {item.facts.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                    <small>{item.geography}</small>
                  </div>
                );
              })}
            </div>
            <div className="source-links">
              {cat.sourceIds.map((id) => {
                const s = sources.find((x) => x.id === id)!;
                return (
                  <a key={id} href={s.url} target="_blank" rel="noreferrer">
                    <span>{s.publisher}</span>
                    {s.title} ↗
                  </a>
                );
              })}
            </div>
          </article>
        </section>
      )}
      {view === "sources" && (
        <section className="shell sources-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow dark">REGISTRO DE FUENTES</p>
              <h2>{sources.length} fuentes trazables</h2>
            </div>
            <p className="section-copy">
              Gobierno primero. Los proxies y diferencias de definición
              permanecen visibles.
            </p>
          </div>
          <div className="source-table">
            {sources.map((s, i) => (
              <a href={s.url} target="_blank" rel="noreferrer" key={s.id}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{s.title}</strong>
                  <small>
                    {s.publisher} · {s.year}
                  </small>
                </div>
                <em>{s.tier}</em>
                <b>↗</b>
              </a>
            ))}
          </div>
          <article className="method-card">
            <h3>Reglas del modelo</h3>
            <ol>
              <li>
                Guadalajara es benchmark externo y nunca altera el orden
                canadiense.
              </li>
              <li>
                Las métricas se normalizan contra referencias nacionales o
                rangos predeterminados, no sólo contra estas ciudades.
              </li>
              <li>
                Cuando falta dato municipal se usa proxy provincial o regional y
                baja la confianza.
              </li>
              <li>
                Las prioridades 1–16 se convierten en pesos lineales: el primer
                lugar pesa 16 veces el último.
              </li>
              <li>
                Todo cambio de año, definición o fuente exige nueva versión del
                dataset.
              </li>
            </ol>
            <p>{modelMeta.caveat}</p>
          </article>
        </section>
      )}
      <footer>
        <div className="shell">
          <strong>Norte / Índice 2026</strong>
          <p>{modelMeta.caveat}</p>
          <span>Metodología y datos versionados · v{modelMeta.version}</span>
        </div>
      </footer>
    </main>
  );
}
