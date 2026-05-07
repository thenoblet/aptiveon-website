import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

interface Props {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  /** Submitted with a plain <form>. If absent, no hidden input is rendered. */
  name?: string;
  /** id given to the trigger button, so a sibling <label htmlFor> works. */
  id?: string;
  placeholder?: string;
  className?: string;
  'aria-labelledby'?: string;
}

/**
 * Accessible custom select built on the W3C Combobox + Listbox pattern.
 * Replaces the native <select> so we can match the brand styling and the
 * dropdown panel itself, which the platform won't let us style.
 */
export default function Select({
  options,
  value,
  onChange,
  name,
  id,
  placeholder,
  className = '',
  'aria-labelledby': ariaLabelledby,
}: Props) {
  const baseId = useId();
  const listboxId = `${baseId}-listbox`;
  const triggerId = id ?? `${baseId}-trigger`;

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() => {
    const i = options.findIndex((o) => o.value === value);
    return i >= 0 ? i : 0;
  });

  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value) ?? null;

  // Track the active index against the current value, so reopening lands on
  // the currently-selected option.
  useEffect(() => {
    const i = options.findIndex((o) => o.value === value);
    if (i >= 0) setActiveIndex(i);
  }, [value, options]);

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  // Keep the active option visible during keyboard navigation.
  useEffect(() => {
    if (!open) return;
    const el = listboxRef.current?.querySelector(
      `[data-index="${activeIndex}"]`,
    ) as HTMLElement | null;
    el?.scrollIntoView({ block: 'nearest' });
  }, [open, activeIndex]);

  const commit = useCallback(
    (index: number) => {
      const opt = options[index];
      if (!opt) return;
      onChange(opt.value);
      setOpen(false);
      triggerRef.current?.focus();
    },
    [options, onChange],
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!open) setOpen(true);
        else setActiveIndex((i) => Math.min(options.length - 1, i + 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!open) setOpen(true);
        else setActiveIndex((i) => Math.max(0, i - 1));
        break;
      case 'Home':
        e.preventDefault();
        setOpen(true);
        setActiveIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setOpen(true);
        setActiveIndex(options.length - 1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (open) commit(activeIndex);
        else setOpen(true);
        break;
      case 'Escape':
        if (open) {
          e.preventDefault();
          setOpen(false);
        }
        break;
      case 'Tab':
        // Let Tab close the dropdown but continue native focus advancement.
        if (open) setOpen(false);
        break;
    }
  };

  return (
    <div ref={containerRef} className={`select ${className}`.trim()}>
      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        className={`select-trigger ${open ? 'is-open' : ''}`}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-labelledby={ariaLabelledby}
        aria-activedescendant={open ? `${baseId}-opt-${activeIndex}` : undefined}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
      >
        <span className={selected ? 'select-value' : 'select-placeholder'}>
          {selected ? selected.label : (placeholder ?? ' ')}
        </span>
        <span className="select-caret" aria-hidden="true">
          ▾
        </span>
      </button>

      {open && (
        <ul
          ref={listboxRef}
          id={listboxId}
          role="listbox"
          aria-labelledby={ariaLabelledby}
          className="select-listbox"
        >
          {options.map((opt, i) => (
            <li
              key={opt.value}
              id={`${baseId}-opt-${i}`}
              role="option"
              aria-selected={opt.value === value}
              data-index={i}
              data-active={i === activeIndex}
              className="select-option"
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => commit(i)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}

      {name && <input type="hidden" name={name} value={value} />}
    </div>
  );
}
