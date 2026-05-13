import { PerchGlyph } from "./PerchFavicon";

type Props = {
  variant?: "dark" | "light";
  className?: string;
};

const ORANGE = "#C45000";

export function PerchCapitalLogo({ variant = "light", className }: Props) {
  const subtle = variant === "light" ? "#6B6560" : "#A39E96";
  const divider = variant === "light" ? "#DDD6CB" : "#3D3936";

  return (
    <div className={className} style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
      <PerchGlyph product="capital" size={28} />
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: 22,
            letterSpacing: "-0.03em",
            color: ORANGE,
            lineHeight: 1,
          }}
        >
          Perch
        </span>
        <span
          aria-hidden
          style={{ width: 1, height: 16, background: divider, display: "inline-block" }}
        />
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: "0.32em",
            color: subtle,
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          Capital
        </span>
      </div>
    </div>
  );
}
