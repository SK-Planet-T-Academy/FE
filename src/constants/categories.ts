export const Categories = {
  SPORTS: "SPORTS",
  TECHNOLOGY: "TECHNOLOGY",
  LIFESTYLE: "LIFESTYLE",
  ENTERTAINMENT: "ENTERTAINMENT",
} as const;

export type CategoryKey = keyof typeof Categories;
export type CategoryValue = (typeof Categories)[CategoryKey];
