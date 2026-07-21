export function CursorMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M4 4h10l6 6v10H4V4zm10 1.5V10h4.5L14 5.5zM6 8v10h12V11h-6V8H6z"
      />
      <path fill="currentColor" d="M11 13l5 2.2-3.4 1.1L11 19.5 11 13z" />
    </svg>
  );
}
