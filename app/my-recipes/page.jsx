// Server Component — fetch จาก Route Handler ของกลุ่มเอง (/api/my-recipes ไม่ใช่ /api/recipes ของเช้า)
// Lab B d) — ตั้ง revalidate อย่างชัดเจน = ISR
import Link from "next/link"
import { connection } from "next/server"   // ⚠️ ไม่มีในสคริปต์ — ดู README หัวข้อ "ต่างจากสคริปต์"

// N = 20 วินาที — ค่าที่เลือกไว้พิสูจน์ใน Network tab (ดูหลักฐานใน README)
const REVALIDATE_SECONDS = 20

export default async function MyRecipesPage() {
  await connection()   // ⚠️ ไม่มีในสคริปต์ — กัน `npm run build` พัง (ตอน build ยังไม่มี server ที่ localhost:3000 ให้ fetch)

  const res = await fetch("http://localhost:3000/api/my-recipes", {
    next: { revalidate: REVALIDATE_SECONDS },   // 🔴 ใส่ชัดเจน ไม่ปล่อยเป็นค่าเริ่มต้น
  })
  const favorites = await res.json()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">สูตรโปรดของฉัน</h1>
      <p className="text-sm text-gray-500 mb-6">
        {favorites.length} รายการ · หน้านี้เป็น ISR ที่ revalidate ทุก {REVALIDATE_SECONDS} วินาที
      </p>

      {favorites.length === 0 ? (
        <p className="text-gray-500">
          ยังไม่มีสูตรโปรด — เข้าไปที่{" "}
          <Link href="/recipes" className="underline">
            หน้าสูตรอาหาร
          </Link>{" "}
          แล้วกด &quot;เพิ่มในสูตรโปรด&quot; จากหน้ารายละเอียด
        </p>
      ) : (
        <ul className="space-y-3">
          {favorites.map(r => (
            <li key={r.id} className="flex items-center gap-3 border rounded-lg p-3">
              {r.thumb && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={r.thumb}
                  alt={r.name}
                  className="w-16 h-16 rounded object-cover shrink-0"
                />
              )}
              <div className="min-w-0">
                <Link href={`/recipes/${r.mealId}`} className="font-medium hover:underline">
                  {r.name}
                </Link>
                <p className="text-xs text-gray-400">mealId: {r.mealId}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
