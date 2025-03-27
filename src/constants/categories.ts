export const Categories = {
  CHAT: "잡담",
  QNA: "QNA",
  REVIEW: "복습",
} as const;

export type CategoryKey = keyof typeof Categories;
export type CategoryValue = (typeof Categories)[CategoryKey];
