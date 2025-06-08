import { useQuery } from "@tanstack/react-query";
import { getSubcategories } from "../../api/get-subcategories.api";
import type { Subcategory } from "../../dto/subcategory.dto";

export const useSubcategoriesQuery = () => {
  return useQuery<Subcategory[]>({
    queryKey: ["subcategories"],
    queryFn: getSubcategories,
  });
};
