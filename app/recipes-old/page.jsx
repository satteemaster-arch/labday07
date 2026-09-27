"use client"
import { useFetch } from "@/hooks/useFetch"
import RecipeList from "@/components/RecipeList"

export default function RecipesOldPage() {
  const { data, loading, error } = useFetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert"
  )

  if (loading) return <p>กำลังโหลด...</p>          // ← จอนี้ browser ต้องวาดก่อน
  if (error) return <p>{error}</p>
  return <RecipeList recipes={data.meals} />
}
