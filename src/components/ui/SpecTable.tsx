import type { ReactNode } from 'react';

export interface SpecRow {
  label: string;
  value: ReactNode;
}

interface Props {
  rows: SpecRow[];
  className?: string;
}

export default function SpecTable({ rows, className = '' }: Props) {
  return (
    <table className={`spec ${className}`.trim()}>
      <tbody>
        {rows.map((r) => (
          <tr key={r.label}>
            <th>{r.label}</th>
            <td>{r.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
