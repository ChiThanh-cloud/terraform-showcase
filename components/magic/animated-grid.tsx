import { cn } from "@/lib/utils";

export function AnimatedGrid({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden dashboard-grid opacity-80",
        className
      )}
    >
      <div className="absolute inset-x-0 top-0 h-1/2 animate-scan bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0,rgba(7,11,20,0.7)_70%)]" />
    </div>
  );
}
