import RecipeList from "@/components/RecipeList"
import FeaturedRecipes from "@/components/FeaturedRecipes"

export default async function RecipesPage() {
  const res = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert")
  // ✓ ถ้า API ต้องใช้ key ลับ ก็เขียน headers: { Authorization: `Bearer ${process.env.API_KEY}` } ตรงนี้ได้เลย
  //   เพราะโค้ดนี้ไม่เคยไปถึง browser — env var ไม่มีวันรั่วไปกับ JS bundle
  const { meals } = await res.json()

  const featured = meals.slice(0, 3)                           // ✓ ประมวลผลข้อมูลตรงนี้ได้เลย

  return (
    <>
      <FeaturedRecipes recipes={featured} />                    {/* ✓ ส่งต่อไป Server Component ลูกได้ */}
      <RecipeList recipes={meals} />
    </>
  )
}
