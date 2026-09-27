export default async function BlogPage() {
  const res = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772", {
    cache: "force-cache"     // ⚠️ Next.js 15 — เขียนชัดเจน (แผนสำรองแถวสุดท้าย) · Next 14 = ไม่ใส่อะไรก็ได้ผลเดียวกัน
  })
  const { meals } = await res.json()
  const recipe = meals[0]
  return <article><h1>{recipe.strMeal}</h1></article>
}
