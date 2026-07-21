import Image from "next/image";

type Variant = "lockup" | "cube";

/**
 * Official Cursor brand marks from cursor.com/brand kit.
 * On dark UI use *_DARK assets (fill #edecec). Do not invent lockups.
 * Clearance: keep modest size with breathing room (~1 cube width).
 */
export function CursorLogo({
  variant = "lockup",
  className,
  height = 28,
  priority = false,
}: {
  variant?: Variant;
  className?: string;
  height?: number;
  priority?: boolean;
}) {
  if (variant === "cube") {
    const w = Math.round(height * (466.73 / 532.09));
    return (
      <Image
        src="/brand/cube-2d-dark.svg"
        alt="Cursor"
        width={w}
        height={height}
        className={className}
        priority={priority}
        unoptimized
      />
    );
  }

  const w = Math.round(height * (2238.7 / 532.09));
  return (
    <Image
      src="/brand/lockup-horizontal-2d-dark.svg"
      alt="Cursor"
      width={w}
      height={height}
      className={className}
      priority={priority}
      unoptimized
    />
  );
}

/** @deprecated Use CursorLogo — kept as alias during migration */
export function CursorMark({ className }: { className?: string }) {
  return <CursorLogo variant="cube" height={24} className={className} />;
}
