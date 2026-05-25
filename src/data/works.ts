export type WorkItem = {
  id: string;
  index: number;
  label: string;
  src: string;
  alt: string;
};

export const TOTAL_WORKS = 59;
const WORK_EXT = 'png';

export const works: WorkItem[] = Array.from({ length: TOTAL_WORKS }, (_, idx) => {
  const index = idx + 1;
  const number = String(index).padStart(2, '0');

  return {
    id: `work-${number}`,
    index,
    label: `${number} / ${TOTAL_WORKS}`,
    src: `/works/P${number}.${WORK_EXT}`,
    alt: `Portfolio screen ${number}`,
  };
});
