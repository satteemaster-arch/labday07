import Link from 'next/link'
import AddRecipeForm from '@/components/AddRecipeForm'

export default function HomePage() {
  return (
    <div className="text-center py-12">
      <h1 className="text-3xl font-bold mb-4">Recipe Browser</h1>
      <p className="text-gray-500 mb-6">
        ค้นหาสูตรอาหารจาก TheMealDB — แปลงมาจาก React SPA วันที่ 4
      </p>
      <Link href="/recipes" className="border px-4 py-2 rounded">
        ไปหน้าค้นหาสูตรอาหาร →
      </Link>

      {/* ⚠️ สคริปต์บล็อก 2.5 ไม่ได้บอกว่าวาง <AddRecipeForm /> ที่หน้าไหน — วางที่หน้าแรกไว้ให้กดได้ (2.6 ขั้นที่ 3 "ปุ่มที่เพิ่งทำ") */}
      <div className="mt-8">
        <AddRecipeForm />
      </div>
    </div>
  )
}
