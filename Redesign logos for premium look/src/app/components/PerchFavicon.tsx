type Props = {
  product: "capital" | "terminal";
  variant?: "dark" | "light";
  size?: number;
};

const ORANGE = "#C45000";

/**
 * The Perch monogram: a custom "P" whose counter forms a bird's head facing right.
 * - The bowl of the P is the bird's head
 * - The counter (negative space) is the eye
 * - A triangular notch on the bowl's right edge is the beak
 * - The descender extends and curls into a tail / lands on the perch line
 *
 * Product tells (kept inside the letterform — no extra glyphs):
 * - Capital: beak juts up-right as a chart spike (markets cue)
 * - Terminal: eye is a square pixel/cursor block (CLI cue)
 */
export function PerchFavicon({ product, variant = "dark", size = 96 }: Props) {
  const bg = variant === "dark" ? "#252322" : "#F7F4EF";
  const border = variant === "dark" ? "#3D3936" : "#DDD6CB";
  const radius = size * 0.22;

  return (
    <div
      style={{
        width: size,
        height: size,
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: radius,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: variant === "dark" ? "inset 0 1px 0 rgba(255,255,255,0.04)" : undefined,
      }}
    >
      <PerchGlyph product={product} size={Math.round(size * 0.62)} />
    </div>
  );
}

export function PerchGlyph({
  product,
  size = 64,
}: {
  product: "capital" | "terminal";
  size?: number;
}) {
  // Viewbox is 64×64. The glyph is drawn within ~10..54 to leave optical padding.
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Perch line — baseline the bird sits on */}
      <rect x="8" y="54" width="48" height="2" fill={ORANGE} />

      {/* Body / stem of the P — runs from top down to the perch line */}
      <rect x="14" y="10" width="9" height="44" fill={ORANGE} />

      {/* Bowl of the P / head of the bird (facing right) */}
      {/* Outer head silhouette */}
      <path
        d={
          product === "capital"
            ? // Capital: head with a slim upward beak — reads as a market spike
              "M23 10 H40 C49 10, 54 16, 54 23 C54 30, 49 36, 40 36 H23 Z M48 14 L56 6 L52 16 Z"
            : // Terminal: head with a straight, shorter beak (more functional, less expressive)
              "M23 10 H40 C49 10, 54 16, 54 23 C54 30, 49 36, 40 36 H23 Z M50 18 L60 22 L50 26 Z"
        }
        fill={ORANGE}
        fillRule="evenodd"
      />

      {/* Eye / counter — the negative space inside the bowl */}
      {product === "capital" ? (
        // Capital: round, classic eye
        <circle cx="38" cy="23" r="3.2" fill="#F7F4EF" />
      ) : (
        // Terminal: a square pixel/cursor block — CLI cue
        <rect x="34.5" y="20" width="6" height="6" fill="#F7F4EF" />
      )}
    </svg>
  );
}
