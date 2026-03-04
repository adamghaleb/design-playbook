interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  variant?: "default" | "outline";
}

export function Badge({ children, color, variant = "default" }: BadgeProps) {
  if (variant === "outline") {
    return (
      <span className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
        {children}
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium"
      style={
        color
          ? {
              backgroundColor: `${color}15`,
              color: color,
              borderColor: `${color}30`,
              borderWidth: 1,
            }
          : undefined
      }
    >
      {children}
    </span>
  );
}
