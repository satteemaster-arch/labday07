// Server Component — ไม่มี hook/event handler เลย รับข้อมูลที่ parent (Server) ประมวลผลมาแล้วทาง props
export default function FeaturedRecipes({ recipes }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-3">⭐ เมนูแนะนำ</h2>
      <ul className="grid grid-cols-3 gap-4">
        {recipes.map(recipe => (
          <li key={recipe.idMeal} className="border rounded-lg overflow-hidden">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full aspect-video object-cover" />
            <p className="p-2 text-sm font-medium line-clamp-1">{recipe.strMeal}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
