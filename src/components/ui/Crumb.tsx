interface Props {
  current: string;
}

export default function Crumb({ current }: Props) {
  return (
    <div className="crumb">
      <span>aptiveon</span>
      <span className="sep">/</span>
      <span className="cur">{current}</span>
    </div>
  );
}
