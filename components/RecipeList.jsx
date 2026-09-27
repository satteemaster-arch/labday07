import RecipeCard from "@/components/RecipeCard"

export default function RecipeList({ recipes }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.idMeal} recipe={recipe} />
      ))}
    </div>
  )
}
