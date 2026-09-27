import RecipeList from "@/components/RecipeList"

export default async function ProductsPage() {
  const res = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood", {
    next: { revalidate: 60 }
  })
  const { meals } = await res.json()
  return <RecipeList recipes={meals} />
}
