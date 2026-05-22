export function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-8 md:mb-10">
      <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm text-muted md:text-base">{subtitle}</p>
    </div>
  );
}
