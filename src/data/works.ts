export type WorkItem = {
  id: string;
  index: number;
  label: string;
  src: string;
  alt: string;
};

export const works: WorkItem[] = Array.from({ length: 59 }, (_, idx) => {
  const index = idx + 1;
  const number = String(index).padStart(2, '0');

  return {
    id: `work-${number}`,
    index,
    label: `P${number}`,
    src: `/works/P${number}.png`,
    alt: `Portfolio work ${number}`,
  };
});

export const TOTAL_WORKS = works.length;
