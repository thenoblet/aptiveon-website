import { useState } from 'react';
import { useImagery } from '@/hooks/useImagery';
import type { Density, Treatment } from '@/lib/imagery';

const TREATMENTS: Treatment[] = ['duotone', 'mute', 'grain', 'full'];
const DENSITIES: Density[] = ['sparse', 'balanced', 'rich'];

export default function ImageryPanel() {
  const { state, set, reset } = useImagery();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        id="apt-tweaks-toggle"
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="dot" />
        <span>imagery</span>
      </button>
      <div id="apt-tweaks" className={open ? 'open' : ''}>
        <header>
          <span>TWEAKS · IMAGERY</span>
          <span className="x" onClick={() => setOpen(false)} role="button" aria-label="Close">
            ×
          </span>
        </header>
        <div className="body">
          <div className="row">
            <div
              className={`toggle ${state.enabled ? 'on' : ''}`}
              onClick={() => set('enabled', !state.enabled)}
              role="switch"
              aria-checked={state.enabled}
              tabIndex={0}
            >
              <span className="name">Show imagery</span>
              <span className="switch" />
            </div>
          </div>
          <div className="row">
            <div className="lbl">Treatment</div>
            <div className="seg">
              {TREATMENTS.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={state.treatment === t ? 'on' : ''}
                  onClick={() => set('treatment', t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="row">
            <div className="lbl">Density</div>
            <div className="seg three">
              {DENSITIES.map((d) => (
                <button
                  key={d}
                  type="button"
                  className={state.density === d ? 'on' : ''}
                  onClick={() => set('density', d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div className="row">
            <div
              className={`toggle ${state.grain ? 'on' : ''}`}
              onClick={() => set('grain', !state.grain)}
              role="switch"
              aria-checked={state.grain}
              tabIndex={0}
            >
              <span className="name">Film grain</span>
              <span className="switch" />
            </div>
          </div>
        </div>
        <div className="foot">
          <span>persists across pages</span>
          <a onClick={reset}>reset</a>
        </div>
      </div>
    </>
  );
}
