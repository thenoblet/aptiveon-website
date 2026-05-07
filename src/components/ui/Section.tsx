import type { HTMLAttributes, ReactNode } from 'react';
import SectionMark from './SectionMark';

interface Props extends HTMLAttributes<HTMLElement> {
  title: string;
  meta?: string;
  children: ReactNode;
}

/** Section block: brand-glyph marker + title + optional meta on the right. */
export default function Section({ id, title, meta, className = '', children, ...rest }: Props) {
  return (
    <section id={id} className={`section ${className}`.trim()} {...rest}>
      <div className="sec-head">
        <SectionMark />
        <h2 className="sec-title">{title}</h2>
        {meta && <div className="sec-meta">{meta}</div>}
      </div>
      <div className="sec-body col-wide">{children}</div>
    </section>
  );
}
