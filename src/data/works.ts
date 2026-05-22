export type WorkItem = {
  id: number;
  image: string;
  indexLabel: string;
};

export const totalWorks = 48;

export const works: WorkItem[] = Array.from({ length: totalWorks }, (_, index) => {
  const id = index + 1;
  const label = String(id).padStart(2, '0');

  return {
    id,
    image: `/works/${label}.png`,
    indexLabel: `${label} / ${String(totalWorks).padStart(2, '0')}`,
  };
});
