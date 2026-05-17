import { cn } from "@/lib/utils";

export function AnimatedBeam({
  path,
  className
}: {
  path: string;
  className?: string;
}) {
  return (
    <path
      d={path}
      fill="none"
      stroke="url(#beam-gradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="12 14"
      className={cn("animate-beam drop-shadow-[0_0_8px_rgba(34,211,238,0.85)]", className)}
    />
  );
}
