"use client";
import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
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

const rankOrderCentroidWeights = (count: number) =>
  Array.from({ length: count }, (_, index) => {
    let weight = 0;
    for (let rank = index + 1; rank <= count; rank += 1) {
      weight += 1 / rank;
    }
    return weight / count;
  });

function HelpTip({label,children}:{label:string;children:React.ReactNode}) {
  return (
    <button type="button" className="help-tip" aria-label={label}>
      ?
      <span className="tip-bubble" role="tooltip">{children}</span>
    </button>
  );
}

export default function Home() {
  const [order, setOrder] = useState(initialOrder),
    [selected, setSelected] = useState("water"),
    [view, setView] = useState<"ranking" | "matrix" | "sources">("ranking"),
    [draggedId, setDraggedId] = useState<string | null>(null),
    [dragOverId, setDragOverId] = useState<string | null>(null),
    [visibleCityIds,setVisibleCityIds]=useState(
      ()=>new Set(cities.filter(city=>city.candidate).map(city=>city.id)),
    );
  const rowRefs=useRef(new Map<string,HTMLDivElement>());
  const previousPositions=useRef(new Map<string,number>());
  const cityRowRefs=useRef(new Map<string,HTMLDivElement>());
  const previousCityPositions=useRef(new Map<string,number>());
  const activeDragId=useRef<string|null>(null);

  useLayoutEffect(()=>{
    if(!previousPositions.current.size) return;
    const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rowRefs.current.forEach((element,id)=>{
      const previousTop=previousPositions.current.get(id);
      if(previousTop===undefined) return;
      const delta=previousTop-element.getBoundingClientRect().top;
      if(delta&&!reduceMotion){
        element.animate(
          [{transform:`translateY(${delta}px)`},{transform:"translateY(0)"}],
          {duration:320,easing:"cubic-bezier(.22,1,.36,1)"},
        );
      }
    });
    cityRowRefs.current.forEach((element,id)=>{
      const previousTop=previousCityPositions.current.get(id);
      if(previousTop===undefined) return;
      const delta=previousTop-element.getBoundingClientRect().top;
      if(delta&&!reduceMotion){
        element.animate(
          [{transform:`translateY(${delta}px)`},{transform:"translateY(0)"}],
          {duration:380,easing:"cubic-bezier(.22,1,.36,1)"},
        );
      }
    });
    previousPositions.current.clear();
    previousCityPositions.current.clear();
  },[order]);
  const ranks = useMemo(
    () => Object.fromEntries(order.map((id, i) => [id, i + 1])),
    [order],
  );
  const priorityWeights = useMemo(
    () => rankOrderCentroidWeights(order.length),
    [order.length],
  );
  const weightsById = useMemo(
    () => Object.fromEntries(order.map((id, i) => [id, priorityWeights[i]])),
    [order, priorityWeights],
  );
  const weighted = useMemo(() => {
    return cities
      .map((city) => ({
        ...city,
        score: categories.reduce(
          (sum, cat) =>
            sum + cat.values[city.id].score * weightsById[cat.id],
          0,
        ),
      }))
      .sort((a, b) => b.score - a.score);
  }, [weightsById]);
  const candidates = weighted.filter((c) => c.candidate&&visibleCityIds.has(c.id)),
    benchmark = weighted.find((c) => !c.candidate)!,
    cat = categories.find((c) => c.id === selected)!,
    visibleCities=cities.filter(city=>!city.candidate||visibleCityIds.has(city.id));
  const highEvidenceShare = categories.reduce(
    (sum, category) =>
      sum +
      (category.values[candidates[0].id].confidence === "Alta"
        ? weightsById[category.id]
        : 0),
    0,
  );
  const winnerDrivers = [...categories]
    .sort(
      (a, b) =>
        b.values[candidates[0].id].score * weightsById[b.id] -
        a.values[candidates[0].id].score * weightsById[a.id],
    )
    .slice(0, 3);
  const updateOrder=(updater:(current:string[])=>string[])=>{
    previousPositions.current=new Map(
      [...rowRefs.current.entries()].map(([id,element])=>[id,element.getBoundingClientRect().top]),
    );
    previousCityPositions.current=new Map(
      [...cityRowRefs.current.entries()].map(([id,element])=>[id,element.getBoundingClientRect().top]),
    );
    setOrder(updater);
  };
  const move = (id: string, dir: -1 | 1) =>
    updateOrder((now) => {
      const a = [...now],
        i = a.indexOf(id),
        j = i + dir;
      if (j < 0 || j >= a.length) return now;
      [a[i], a[j]] = [a[j], a[i]];
      return a;
    });
  const setRank = (id: string, rank: number) =>
    updateOrder((now) => {
      const a = now.filter((x) => x !== id);
      a.splice(Math.max(0, Math.min(a.length, rank - 1)), 0, id);
      return a;
    });
  const reorderWhileDragging = (targetId: string) => {
    const activeId=activeDragId.current;
    if (!activeId || activeId === targetId) return;
    updateOrder((now) => {
      const from=now.indexOf(activeId);
      const target=now.indexOf(targetId);
      if(from<0||target<0||from===target) return now;
      const next=[...now];
      next.splice(from,1);
      next.splice(target,0,activeId);
      return next;
    });
  };
  const autoScroll=(clientY:number)=>{
    const edge=96;
    if(clientY>window.innerHeight-edge) window.scrollBy({top:16,behavior:"auto"});
    else if(clientY<edge) window.scrollBy({top:-16,behavior:"auto"});
  };
  const toggleCity=(cityId:(typeof cities)[number]["id"])=>{
    setVisibleCityIds(current=>{
      const next=new Set(current);
      if(next.has(cityId)){
        if(next.size===1) return current;
        next.delete(cityId);
      }else next.add(cityId);
      return next;
    });
  };
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
                de prioridad y mantiene visible la incertidumbre.
              </p>
            </div>
            <div className="kpi-grid" aria-live="polite">
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
                <strong>{categories.length} × {visibleCities.length}</strong>
                <small>categorías por lugares visibles</small>
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
                  Con tus prioridades actuales, sus mayores aportes ponderados
                  vienen de {winnerDrivers.map((driver) => driver.short).join(", ")}.
                  El ranking considera simultáneamente las 16 categorías.
                </p>
                <div className="confidence">
                  <span>
                    Peso con evidencia Alta
                    <HelpTip label="¿Qué significa evidencia Alta?">
                      Es el porcentaje del resultado actual que proviene de
                      categorías con datos municipales o metropolitanos
                      recientes y comparables. No mide la probabilidad de que
                      la ciudad sea la correcta para ti.
                    </HelpTip>
                  </span>
                  <strong>{(highEvidenceShare * 100).toFixed(0)}%</strong>
                </div>
                <small>
                  Es la proporción ponderada respaldada por fichas calificadas
                  Alta; no es una probabilidad. El resto usa datos provinciales
                  o proxies regionales.
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
                  onClick={() => updateOrder(() => initialOrder)}
                >
                  ↺ Restablecer prioridades
                </button>
              </div>
              <div className="priority-workbench">
                <div className="priority-column">
                  <div className="priority-guide">
                    <div>
                      <strong>Prioridad 1 tiene más influencia</strong>
                      <HelpTip label="¿Cómo funcionan las prioridades?">
                        Imagina que repartes 100 fichas. La categoría número 1
                        recibe más fichas que la 2, y así sucesivamente. Cada
                        ciudad gana puntos según qué tan bien le va en las
                        categorías que recibieron más fichas.
                      </HelpTip>
                    </div>
                    <p>
                      Arrastra desde ⠿, usa las flechas o escribe la posición.
                      El ranking de la derecha responde al instante.
                    </p>
                  </div>
                  <div className="weights-list">
                    {order.map((id, i) => {
                      const c = categories.find((x) => x.id === id)!;
                      return (
                        <div
                          ref={(element)=>{
                            if(element) rowRefs.current.set(id,element);
                            else rowRefs.current.delete(id);
                          }}
                          className={`weight-row${draggedId === id ? " dragging" : ""}${dragOverId === id ? " drag-over" : ""}`}
                          data-category-id={id}
                          key={id}
                        >
                          <button
                            className="drag-handle"
                            aria-label={`Arrastrar ${c.name}`}
                            aria-pressed={draggedId===id}
                            title="Mantén y arrastra para cambiar la prioridad"
                            onPointerDown={(event) => {
                              event.preventDefault();
                              event.currentTarget.setPointerCapture(event.pointerId);
                              activeDragId.current=id;
                              setDraggedId(id);
                              setDragOverId(id);
                              document.body.classList.add("priority-drag-active");
                            }}
                            onPointerMove={(event)=>{
                              if(activeDragId.current!==id) return;
                              event.preventDefault();
                              autoScroll(event.clientY);
                              const target=(document.elementFromPoint(event.clientX,event.clientY) as HTMLElement|null)
                                ?.closest<HTMLElement>(".weight-row")?.dataset.categoryId;
                              if(target&&target!==id){
                                setDragOverId(target);
                                reorderWhileDragging(target);
                              }
                            }}
                            onPointerUp={(event) => {
                              if(event.currentTarget.hasPointerCapture(event.pointerId)){
                                event.currentTarget.releasePointerCapture(event.pointerId);
                              }
                              activeDragId.current=null;
                              setDraggedId(null);
                              setDragOverId(null);
                              document.body.classList.remove("priority-drag-active");
                            }}
                            onPointerCancel={() => {
                              activeDragId.current=null;
                              setDraggedId(null);
                              setDragOverId(null);
                              document.body.classList.remove("priority-drag-active");
                            }}
                          >
                            ⠿
                          </button>
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
                            <span>{(priorityWeights[i] * 100).toFixed(1)}%</span>
                            <HelpTip label={`¿Qué significa el peso de ${c.name}?`}>
                              Al estar en la posición {i+1}, esta categoría
                              aporta {(priorityWeights[i]*100).toFixed(1)} de
                              cada 100 puntos del cálculo final. Su peso cambia
                              al moverla de lugar.
                            </HelpTip>
                          </div>
                          <div className="arrows">
                            <button
                              aria-label={`Subir ${c.name}`}
                              disabled={i === 0}
                              onClick={() => move(id, -1)}
                            >
                              ↑
                            </button>
                            <button
                              aria-label={`Bajar ${c.name}`}
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
                <aside className="live-ranking" aria-live="polite">
                  <div className="live-ranking-head">
                    <div>
                      <span>RESULTADO EN VIVO</span>
                      <h3>Ranking actual</h3>
                    </div>
                    <HelpTip label="¿Cómo se calcula el ranking?">
                      Para cada ciudad multiplicamos su nota de cada categoría
                      por el peso que tú asignaste. Sumamos los 16 resultados y
                      ordenamos de mayor a menor. Guadalajara no compite.
                    </HelpTip>
                  </div>
                  <details className="city-filter">
                    <summary>⚙️ Ciudades · {visibleCityIds.size}/11</summary>
                    <div className="filter-popover">
                      <div className="filter-title">
                        <strong>Comparar destinos</strong>
                        <button
                          type="button"
                          onClick={()=>setVisibleCityIds(new Set(cities.filter(city=>city.candidate).map(city=>city.id)))}
                        >
                          Mostrar todas
                        </button>
                      </div>
                      {cities.filter(city=>city.candidate).map(city=>(
                        <label key={city.id}>
                          <input
                            type="checkbox"
                            checked={visibleCityIds.has(city.id)}
                            disabled={visibleCityIds.has(city.id)&&visibleCityIds.size===1}
                            onChange={()=>toggleCity(city.id)}
                          />
                          <span style={{"--city-color":city.color} as React.CSSProperties}/>
                          {city.name}
                        </label>
                      ))}
                      <small>Guadalajara permanece como referencia y no compite.</small>
                    </div>
                  </details>
                  <div className="live-leader">
                    <span>🏆 Mejor opción ahora</span>
                    <strong>{candidates[0].name}</strong>
                    <div>
                      {candidates[0].score.toFixed(1)}/100
                      <HelpTip label="¿Qué significa este score?">
                        Es una suma ponderada de las 16 notas de esta ciudad con
                        tus prioridades actuales. Sirve para comparar opciones,
                        no para predecir que una mudanza tendrá éxito.
                      </HelpTip>
                    </div>
                  </div>
                  <div className="live-city-list">
                    {candidates.map((city,index)=>(
                      <div
                        ref={(element)=>{
                          if(element) cityRowRefs.current.set(city.id,element);
                          else cityRowRefs.current.delete(city.id);
                        }}
                        className={`live-city-row${index===0?" leader":""}`}
                        key={city.id}
                      >
                        <span>{index+1}</span>
                        <strong>{city.name}</strong>
                        <div className="bar-track">
                          <div className="bar-fill" style={{width:`${city.score}%`,background:city.color}}/>
                        </div>
                        <b>{city.score.toFixed(1)}</b>
                      </div>
                    ))}
                  </div>
                  <div className="live-benchmark">
                    <span>Origen</span>
                    <strong>Guadalajara</strong>
                    <b>{benchmark.score.toFixed(1)}</b>
                  </div>
                  <p className="live-note">
                    El orden puede cambiar aunque el líder permanezca igual.
                    Observa también la distancia entre ciudades.
                  </p>
                </aside>
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
                  {visibleCities.map((c) => (
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
                      {visibleCities.map((city) => (
                        <td key={city.id}>
                          <span
                            className="score-pill"
                            aria-label={`${city.name}: ${c.values[city.id].score} de 100 en ${c.name}`}
                            title={`${city.name}: ${c.values[city.id].score}/100 en ${c.name}. Selecciona esta fila para ver los datos y la fórmula.`}
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
              {visibleCities.map((city) => {
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
                Las prioridades 1–16 se convierten con Rank-Order Centroid: cada
                posición recibe el promedio de los pesos recíprocos restantes.
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
