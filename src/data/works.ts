export type WorkItem = {
  id: number;
  image: string;
  label: string;
  title?: string;
  category?: string;
};

export const TOTAL_WORKS = 48;

export const works: WorkItem[] = Array.from({ length: TOTAL_WORKS }, (_, index) => {
  const id = index + 1;
  const label = String(id).padStart(2, '0');

  return {
    id,
    label,
    image: `/works/${label}.png`,
  };
});
