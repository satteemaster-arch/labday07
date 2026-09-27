// Route Handler ของกลุ่มเอง — path /api/my-recipes แยกจาก /api/recipes ของเช้า (Twist ข้อ 3)
import { NextResponse } from "next/server"
import { myRecipes } from "@/lib/data/my-recipes"

// GET /api/my-recipes         → คืนสูตรโปรดทั้งหมด
// GET /api/my-recipes?q=chick → กรองตามชื่อ ไม่สนตัวพิมพ์เล็ก/ใหญ่
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get("q")

  // toLowerCase() ทั้งสองข้าง → ?q=CHICKEN เจอ "Teriyaki Chicken Casserole"
  const result = q
    ? myRecipes.filter(r => r.name.toLowerCase().includes(q.toLowerCase()))
    : myRecipes

  return NextResponse.json(result)
}

// POST /api/my-recipes  body: { mealId, name, thumb }
// 🔴 ห้ามหลุดเป็น 500 — ตอบ { error: "..." } เองครบ 3 กรณี
export async function POST(request) {
  // กรณี 1: body ไม่ใช่ JSON (เช่น -d 'hello' หรือไม่ส่ง body เลย)
  // request.json() จะ throw → ถ้าไม่ครอบ try/catch Next.js จะตอบ 500 ให้เอง
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: "body ต้องเป็น JSON ที่ถูกรูปแบบ" },
      { status: 400 }
    )
  }

  // กันกรณี body เป็น JSON ที่ไม่ใช่ object เช่น -d '"hello"' หรือ -d 'null'
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json(
      { error: "body ต้องเป็น JSON object" },
      { status: 400 }
    )
  }

  const { mealId, name, thumb } = body

  // กรณี 2: เป็น JSON แต่ field ไม่ครบ
  if (!mealId || !name) {
    return NextResponse.json(
      { error: "ต้องมีทั้ง mealId และ name" },
      { status: 400 }
    )
  }

  // กรณี 3: mealId นี้อยู่ในรายการโปรดแล้ว → 409 Conflict ไม่ใช่ 400
  // เหตุผล: 400 Bad Request = "คำขอเขียนมาผิดรูป แก้ body แล้วลองใหม่ได้"
  //         แต่ body นี้ถูกต้องทุกอย่าง — ปัญหาอยู่ที่ "สถานะปัจจุบันของ store"
  //         ที่มี mealId นี้อยู่แล้ว ส่ง body เดิมซ้ำอีกกี่ครั้งก็ไม่ผ่าน
  //         409 Conflict สื่อตรงตัวว่า "ชนกับสถานะที่มีอยู่" ซึ่งเป็นคนละสาเหตุกัน
  const exists = myRecipes.some(r => String(r.mealId) === String(mealId))
  if (exists) {
    return NextResponse.json(
      { error: `"${name}" อยู่ในรายการโปรดแล้ว` },
      { status: 409 }
    )
  }

  const newFavorite = {
    id: Date.now(),
    mealId: String(mealId),
    name,
    thumb: thumb ?? null,
    addedAt: new Date().toISOString(),
  }
  myRecipes.push(newFavorite)

  return NextResponse.json(newFavorite, { status: 201 })
}
