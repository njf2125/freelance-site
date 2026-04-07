export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-[3px] border-emerald-500 bg-card rounded-r-lg px-4 py-3 my-4 text-sm text-muted-foreground leading-relaxed [&_strong]:text-foreground [&_strong]:font-medium">
      {children}
    </div>
  );
}
