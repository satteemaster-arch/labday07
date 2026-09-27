// Server Component — ไฟล์นี้ไม่มี hook/event handler เอง จึงไม่ต้องมี "use client"
// Lab A b) — ครอบการ์ดทั้งใบด้วย <Link> ไป /recipes/${recipe.idMeal}
import Link from "next/link"

export default function RecipeCard({ recipe }) {
  return (
    <Link
      href={`/recipes/${recipe.idMeal}`}
      className="block border rounded-lg overflow-hidden hover:border-orange-400 transition-colors"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full aspect-square object-cover"
      />
      <div className="p-3">
        <h3 className="font-bold text-sm line-clamp-1">{recipe.strMeal}</h3>
      </div>
    </Link>
  )
}
