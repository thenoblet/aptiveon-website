import { type CSSProperties, type HTMLAttributes } from 'react';
import { IMG, type ImgKey } from '@/lib/imagery';

interface Props extends HTMLAttributes<HTMLDivElement> {
  src: ImgKey | string;
  alt?: string;
}

function resolveSrc(src: ImgKey | string): string {
  if (src in IMG) return IMG[src as ImgKey];
  return src;
}

export default function Image({
  src,
  alt = '',
  className = '',
  style,
  ...rest
}: Props) {
  const url = resolveSrc(src);
  const cls = ['apt-img', className].filter(Boolean).join(' ');
  const finalStyle: CSSProperties = {
    backgroundImage: `url("${url}")`,
    ...style,
  };
  return (
    <div role="img" aria-label={alt} className={cls} style={finalStyle} {...rest}>
      {alt && <div className="apt-img-cap">{alt}</div>}
    </div>
  );
}
