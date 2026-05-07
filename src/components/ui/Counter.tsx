import { useCounter } from '@/hooks/useCounter';

interface Props {
  from?: number;
  to: number;
  decimals?: number;
  duration?: number;
}

export default function Counter({ from = 0, to, decimals = 0, duration }: Props) {
  const { ref, text } = useCounter({ from, to, decimals, duration });
  return <span ref={ref}>{text}</span>;
}
