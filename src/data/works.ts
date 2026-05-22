export type WorkItem = {
  id: number;
  title: string;
  image: string;
  category: string;
};

export const works: WorkItem[] = Array.from({ length: 48 }, (_, index) => {
  const id = index + 1;
  return {
    id,
    title: `Project ${String(id).padStart(2, '0')}`,
    image: `/works/${String(id).padStart(2, '0')}.png`,
    category: id <= 16 ? 'Mobile UI' : id <= 32 ? 'Visual System' : 'Operation Design',
  };
});

export const featuredWorks = works.slice(0, 6);
