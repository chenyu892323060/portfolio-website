export type WorkItem = {
  id: string;
  index: number;
  src: string;
  webpSrc: string;
  alt: string;
};

export const TOTAL_WORKS = 59;

export const works: WorkItem[] = Array.from({ length: TOTAL_WORKS }, (_, idx) => {
  const index = idx + 1;
  const number = String(index).padStart(2, '0');

  return {
    id: `work-${number}`,
    index,
    src: `/works/P${number}.png`,
    webpSrc: `/works/P${number}.webp`,
    alt: `Portfolio work ${number}`,
  };
});
