import React, {useCallback, useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import {useColorMode} from '@docusaurus/theme-common';

import {DEMOS as DEMOS_RAW} from '@site/src/components/GridDemos/data';
import '@site/src/components/GridDemos/styles.css';

type BuiltGrid = {columns: any[]; data: any[]; options?: Record<string, unknown>};
type Demo = {
  id: string;
  title: string;
  glyph: string;
  desc: string;
  c1: string;
  c2: string;
  rows: number;
  cols: number;
  build: () => BuiltGrid;
};

const DEMOS = DEMOS_RAW as unknown as Demo[];

const CDN = 'https://cdn.jsdelivr.net/npm/photon-grid-core@2.0.1/photon-grid.min.js';

// Load the PhotonGrid UMD bundle once and resolve the global.
function loadPhoton(): Promise<any> {
  const w = window as any;
  if (w.PhotonGrid) return Promise.resolve(w.PhotonGrid);
  return new Promise((resolve, reject) => {
    let s = document.querySelector<HTMLScriptElement>('script[data-photon-grid]');
    if (!s) {
      s = document.createElement('script');
      s.src = CDN;
      s.async = true;
      s.setAttribute('data-photon-grid', 'true');
      document.head.appendChild(s);
    }
    s.addEventListener('load', () => resolve(w.PhotonGrid));
    s.addEventListener('error', () =>
      reject(new Error('Failed to load Photon Grid from CDN')),
    );
    if (w.PhotonGrid) resolve(w.PhotonGrid);
  });
}

function DemosApp(): React.ReactElement {
  const {colorMode} = useColorMode();
  const dark = colorMode === 'dark';

  const gridElRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<any>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const [activeId, setActiveId] = useState(DEMOS[0].id);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState({rows: 0, cols: 0});

  const active = DEMOS.find((d) => d.id === activeId)!;

  // Load the grid engine on mount.
  useEffect(() => {
    let live = true;
    loadPhoton()
      .then(() => live && setReady(true))
      .catch((e) => live && setError(e.message));
    return () => {
      live = false;
    };
  }, []);

  // (Re)build the grid whenever the active demo or the site theme changes.
  useEffect(() => {
    if (!ready || !gridElRef.current) return;
    const PG = (window as any).PhotonGrid;
    if (!PG) return;

    const built = active.build();
    if (gridRef.current && typeof gridRef.current.destroy === 'function') {
      gridRef.current.destroy();
    }
    gridElRef.current.innerHTML = '';

    const options = Object.assign(
      {
        headerRowHeight: 46,
        rowHeight: 46,
        theme: dark ? PG.darkTheme : PG.lightTheme,
        pagination: {enabled: true, pageSize: 25},
      },
      built.options || {},
      {columns: built.columns, data: built.data},
    );

    gridRef.current = new PG.GridCore(gridElRef.current, options);
    setMeta({rows: built.data.length, cols: built.columns.length});
    if (searchRef.current) searchRef.current.value = '';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, activeId, dark]);

  // Destroy the grid on unmount (e.g. navigating away).
  useEffect(
    () => () => {
      if (gridRef.current && typeof gridRef.current.destroy === 'function') {
        gridRef.current.destroy();
        gridRef.current = null;
      }
    },
    [],
  );

  const onSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    const g = gridRef.current;
    if (g && g.api && typeof g.api.setQuickFilter === 'function') {
      g.api.setQuickFilter(term);
    }
  }, []);

  return (
    <div className="pg-demos">
      <section className="pg-hero">
        <h1 className="pg-hero__title">{active.title}</h1>
        <p className="pg-hero__desc">{active.desc}</p>
      </section>

      <section className="pg-cards" aria-label="Choose a demo">
        {DEMOS.map((d) => (
          <button
            key={d.id}
            type="button"
            className={clsx('pg-card', d.id === activeId && 'is-active')}
            style={{['--c1' as any]: d.c1, ['--c2' as any]: d.c2}}
            onClick={() => setActiveId(d.id)}>
            <span className="pg-card__thumb">
              <span className="pg-card__glyph">{d.glyph}</span>
            </span>
            <span className="pg-card__body">
              <span className="pg-card__title">{d.title}</span>
              <span className="pg-card__desc">{d.desc}</span>
              <span className="pg-card__meta">
                <span>{d.rows} rows</span>
                <span>{d.cols} cols</span>
              </span>
            </span>
          </button>
        ))}
      </section>

      <section className="pg-panel">
        <div className="pg-toolbar">
          <div className="pg-meta">
            <strong>{meta.rows}</strong> rows
            <span className="pg-dot" />
            <strong>{meta.cols}</strong> columns
            <span className="pg-dot" />
            {active.title}
          </div>
          <div className="pg-toolbar__right">
            <div className="pg-search">
              <span className="pg-search__icon">⌕</span>
              <input
                ref={searchRef}
                type="search"
                placeholder="Filter rows…"
                autoComplete="off"
                onChange={onSearch}
              />
            </div>
          </div>
        </div>
        <div className="pg-gridwrap">
          {error ? (
            <div className="pg-demos__loading">{error}</div>
          ) : !ready ? (
            <div className="pg-demos__loading">Loading grid engine…</div>
          ) : null}
          <div ref={gridElRef} className="pg-grid" />
        </div>
      </section>
    </div>
  );
}

export default function DemosPage(): React.ReactElement {
  return (
    <Layout
      title="Live Demos — Photon Grid"
      description="Interactive Photon Grid demos: HR directories, finance watchlists, e-commerce orders and project trackers with custom cell renderers — flags, avatars, badges, ratings and progress bars.">
      <BrowserOnly
        fallback={
          <div className="pg-demos">
            <div className="pg-demos__loading">Loading demos…</div>
          </div>
        }>
        {() => <DemosApp />}
      </BrowserOnly>
    </Layout>
  );
}
