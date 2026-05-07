import { useEffect, useId, useRef, type MouseEvent, type ReactNode } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

/**
 * Modal built on the native <dialog> element. The browser handles focus trap,
 * Escape-to-close, scroll-lock and inert backdrop for free; we add a click-on-
 * backdrop close handler on top.
 */
export default function Modal({ open, onClose, title, children }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  // Sync open state to the imperative dialog API.
  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (open && !dlg.open) dlg.showModal();
    else if (!open && dlg.open) dlg.close();
  }, [open]);

  // Click on the area outside the dialog box (i.e. on the ::backdrop) closes it.
  const handleClick = (e: MouseEvent<HTMLDialogElement>) => {
    const dlg = e.currentTarget;
    const rect = dlg.getBoundingClientRect();
    const inside =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;
    if (!inside) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={handleClick}
    >
      <header className="modal-head">
        <h2 id={titleId}>{title}</h2>
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
      </header>
      <div className="modal-body">{children}</div>
    </dialog>
  );
}
