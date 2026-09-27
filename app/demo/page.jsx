import { connection } from "next/server"   // ⚠️ ไม่มีในสคริปต์ — ดู README หัวข้อ "ต่างจากสคริปต์"

export default async function DemoPage() {
  await connection()   // ⚠️ ไม่มีในสคริปต์ — กัน `npm run build` พัง (ตอน build ยังไม่มี server ที่ localhost:3000 ให้ fetch)
  const res = await fetch("http://localhost:3000/api/time", {
    next: { revalidate: 3 }     // 🖐 #5 — จาก 10 เหลือ 3 (สถานะตอน ✅ #2)
  })
  const { time } = await res.json()
  return <p>เวลาที่ดึงมา: {time}</p>
}
