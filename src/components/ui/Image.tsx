import { type CSSProperties, type HTMLAttributes } from 'react';
import { IMG, type ImgKey } from '@/lib/imagery';
import { useImagery } from '@/hooks/useImagery';

interface Props extends HTMLAttributes<HTMLDivElement> {
  src: ImgKey | string;
  alt?: string;
  /** Adds `apt-img-block` so the imagery `enabled=false` toggle hides it. */
  block?: boolean;
  /** Density tier — set to filter out via the `data-img-density` toggle. */
  density?: 'extra' | 'rich';
}

function resolveSrc(src: ImgKey | string): string {
  if (src in IMG) return IMG[src as ImgKey];
  return src;
}

export default function Image({
  src,
  alt = '',
  block = true,
  density,
  className = '',
  style,
  ...rest
}: Props) {
  const { state } = useImagery();
  const url = resolveSrc(src);
  const cls = [
    'apt-img',
    block ? 'apt-img-block' : '',
    density === 'extra' ? 'apt-img-density-extra' : '',
    density === 'rich' ? 'apt-img-density-rich' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const finalStyle: CSSProperties = {
    backgroundImage: `url("${url}")`,
    ...style,
  };
  return (
    <div
      role="img"
      aria-label={alt}
      data-alt={alt}
      className={cls}
      style={finalStyle}
      {...rest}
    >
      <div className="apt-img-fx" />
      {state.grain && <div className="apt-img-grain" />}
      {alt && <div className="apt-img-cap">{alt}</div>}
    </div>
  );
}
