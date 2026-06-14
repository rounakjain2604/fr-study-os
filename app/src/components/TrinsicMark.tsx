type TrinsicMarkProps = {
  size?: number;
  className?: string;
  title?: string;
};

/**
 * Trinsic emblem, distilled for UI use — a pointed arch sheltering a radiant
 * Om disc, with a single guiding star. Single-colour (currentColor) so it
 * adapts to context; brand surfaces set colour to var(--accent).
 */
export function TrinsicMark({ size = 32, className, title = "Trinsic" }: TrinsicMarkProps) {
  return (
    <svg
      className={className}
      width={(size * 48) / 60}
      height={size}
      viewBox="0 0 48 60"
      role="img"
      aria-label={title}
      fill="none"
    >
      <circle cx="24" cy="5" r="2" fill="currentColor" />
      <path
        d="M9,55 L9,26 Q9,16.5 16.5,11.5 Q24,6.5 31.5,11.5 Q39,16.5 39,26 L39,55"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33,13.5 L34.3,17.2 L38,18.5 L34.3,19.8 L33,23.5 L31.7,19.8 L28,18.5 L31.7,17.2 Z"
        fill="currentColor"
      />
      <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <path d="M33.5,37 L35.5,37 M32.1,28.9 L30.7,30.3 M24,25.5 L24,27.5 M15.9,28.9 L17.3,30.3 M12.5,37 L14.5,37 M15.9,45.1 L17.3,43.7 M24,48.5 L24,46.5 M32.1,45.1 L30.7,43.7" />
        <circle cx="24" cy="37" r="8.4" strokeWidth="1.5" />
      </g>
      <text
        x="24"
        y="41"
        textAnchor="middle"
        fontSize="12.5"
        fontFamily="var(--serif)"
        fill="currentColor"
      >
        {"ॐ"}
      </text>
    </svg>
  );
}
