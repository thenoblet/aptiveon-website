import type { ReactNode } from 'react';

interface MetaItem {
  label: string;
  value: ReactNode;
}

interface Props {
  /** Headline. Use a <span className="mark"> child for the orange highlight. */
  title: ReactNode;
  dek: ReactNode;
  meta?: MetaItem[];
}

export default function PageHero({ title, dek, meta }: Props) {
  return (
    <section className="page-hero">
      <h1 className="page-title">{title}</h1>
      <p className="page-dek">{dek}</p>
      {meta && (
        <div className="hero-meta">
          {meta.map((m) => (
            <div key={m.label}>
              <b>{m.label}</b>
              {m.value}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
