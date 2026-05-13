import { PerchGlyph } from "./PerchFavicon";

type Props = {
  variant?: "dark" | "light";
  className?: string;
};

const ORANGE = "#C45000";

export function PerchTerminalLogo({ variant = "light", className }: Props) {
  const subtle = variant === "light" ? "#7A746F" : "#9C968E";
  const divider = variant === "light" ? "#CFC6B8" : "#2E2A27";

  return (
    <div className={className} style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <PerchGlyph product="terminal" size={28} />
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: 22,
            letterSpacing: "-0.035em",
            color: ORANGE,
            lineHeight: 1,
            fontFeatureSettings: "'ss01', 'cv11'",
          }}
        >
          Perch
        </span>
        <span
          aria-hidden
          style={{
            width: 1,
            height: 14,
            background: divider,
            display: "inline-block",
            transform: "translateY(-1px)",
          }}
        />
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: 10,
            letterSpacing: "0.42em",
            color: subtle,
            textTransform: "uppercase",
            lineHeight: 1,
            paddingRight: "0.42em",
          }}
        >
          Terminal
        </span>
      </div>
    </div>
  );
}
