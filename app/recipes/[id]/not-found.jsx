// not-found.jsx ของ segment นี้ — Next.js เรียกไฟล์นี้เมื่อ page.jsx เรียก notFound()
// วางไว้ใน app/recipes/[id]/ จึงครอบเฉพาะหน้า detail (ไม่ใช่ 404 รวมของทั้งแอป)
import Link from "next/link"

export default function RecipeNotFound() {
  return (
    <div className="text-center py-16">
      <h1 className="text-2xl font-bold mb-2">ไม่พบสูตรนี้</h1>
      <p className="text-gray-500 mb-6">
        id ที่ระบุไม่มีอยู่ใน TheMealDB หรือรูปแบบ id ไม่ถูกต้อง
      </p>
      <Link href="/recipes" className="border px-4 py-2 rounded inline-block">
        ← กลับไปหน้ารายการ
      </Link>
    </div>
  )
}
