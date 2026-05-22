export type WorkItem = {
  id: number;
  index: number;
  src: string;
  label: string;
};

export const TOTAL_WORKS = 48;

export const works: WorkItem[] = Array.from({ length: TOTAL_WORKS }, (_, i) => {
  const index = i + 1;
  const label = String(index).padStart(2, '0');

  return {
    id: index,
    index,
    label,
    src: `/works/${label}.png`,
  };
});
