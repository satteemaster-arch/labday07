// Server Component — ไม่มี "use client" ไม่มี useEffect/useState
// fetch เกิดบนเซิร์ฟเวอร์ก่อนส่ง HTML ออกไป → ไม่มี spinner เลยแม้แต่เสี้ยววินาที
import Link from "next/link"
import { notFound } from "next/navigation"
import AddFavoriteButton from "@/components/AddFavoriteButton"

// TheMealDB ไม่ให้ ingredients มาเป็น array — ให้เป็น field แบน ๆ 20 คู่
// ช่องที่ไม่ใช้มา 2 หน้าตา (ตรวจจาก lookup.php?i=52772 จริง):
//   strIngredient10..15 → ""   (empty string)
//   strIngredient16..20 → null
// บางสูตรยังเจอ " " (ช่องว่างล้วน) ด้วย → เช็ค typeof + trim() ให้รอดทั้งสามแบบ
function getIngredients(meal) {
  return Array.from({ length: 20 }, (_, i) => i + 1)
    .map(i => ({
      name: meal[`strIngredient${i}`],
      measure: meal[`strMeasure${i}`],
    }))
    .filter(x => typeof x.name === "string" && x.name.trim() !== "")
    .map(x => ({
      name: x.name.trim(),
      measure: typeof x.measure === "string" ? x.measure.trim() : "",
    }))
}

export default async function RecipeDetailPage({ params }) {
  // ⚠️ Next.js 15: params เป็น Promise ต้อง await ก่อนอ่านค่า
  // (เวอร์ชันก่อนหน้าอ่าน params.id ตรง ๆ ได้ — เวอร์ชันนี้จะได้ warning เรื่อง sync access)
  const { id } = await params

  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(id)}`
  )
  if (!res.ok) notFound()

  const { meals } = await res.json()

  // 🔴 Twist ข้อ 4 — TheMealDB ตอบ "ไม่พบ" 2 หน้าตา และไม่มีแบบไหนเป็น array ว่าง:
  //   /recipes/99999  → { "meals": null }          → meals?.[0] = undefined  ✅ จับได้
  //   /recipes/xxxxx  → { "meals": "Invalid ID" }  → meals?.[0] = "I"  ❌ truthy! หลุดเงื่อนไข
  // string ก็มี index [0] ได้ เลยผ่าน meals?.[0] ไปแล้วพังตอนอ่าน meal.strMeal
  // ต้องเช็ค Array.isArray() ด้วยจึงจะรอดทั้งคู่
  if (!Array.isArray(meals) || meals.length === 0) notFound()

  const meal = meals[0]
  const ingredients = getIngredients(meal)

  return (
    <article>
      <Link href="/recipes" className="text-sm text-gray-500 hover:text-gray-900">
        ← กลับไปหน้ารายการ
      </Link>

      <h1 className="text-3xl font-bold mt-3 mb-2">{meal.strMeal}</h1>
      <p className="text-sm text-gray-500 mb-4">
        {meal.strCategory}
        {meal.strArea ? ` · ${meal.strArea}` : ""}
      </p>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full max-w-md rounded-lg mb-6"
      />

      {/* Lab B c) — Client Component ตัวเดียวในหน้านี้ เป็นลูกของ Server Component */}
      <AddFavoriteButton
        mealId={meal.idMeal}
        name={meal.strMeal}
        thumb={meal.strMealThumb}
      />

      <h2 className="text-xl font-bold mt-8 mb-2">
        วัตถุดิบ ({ingredients.length} อย่าง)
      </h2>
      <ul className="mb-6 space-y-1">
        {ingredients.map(x => (
          <li key={x.name} className="text-sm">
            <span className="text-gray-500">{x.measure || "—"}</span>
            {" · "}
            {x.name}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-bold mb-2">วิธีทำ</h2>
      <p className="whitespace-pre-line leading-relaxed">{meal.strInstructions}</p>
    </article>
  )
}
