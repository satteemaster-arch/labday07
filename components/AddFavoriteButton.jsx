// Client Component — มี onClick + useState จึงต้องมี "use client"
"use client"

import { useState } from "react"

export default function AddFavoriteButton({ mealId, name, thumb }) {
  // idle → saving → saved | exists | error
  const [status, setStatus] = useState("idle")
  const [message, setMessage] = useState("")

  async function handleClick() {
    setStatus("saving")
    setMessage("")

    try {
      const res = await fetch("/api/my-recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mealId, name, thumb }),
      })

      // อ่าน body ก่อนเช็ค status — Route Handler ของเราส่ง { error } มาทุกกรณีที่พลาด
      const data = await res.json().catch(() => ({}))

      if (res.status === 201) {
        setStatus("saved")
        return
      }

      // 409 = มีอยู่แล้ว — จากมุมผู้ใช้ "สูตรนี้อยู่ในโปรดแล้ว" ไม่ใช่ความล้มเหลว
      // จึงไม่ขึ้น ❌ แต่บอกตามจริงว่าเพิ่มไว้แล้ว
      if (res.status === 409) {
        setStatus("exists")
        setMessage(data.error ?? "")
        return
      }

      // กรณีพลาดจริง → แสดง error message ที่ Route Handler ส่งกลับมา
      // ไม่ใช่ข้อความตายตัวที่เขียนไว้ในปุ่ม
      setStatus("error")
      setMessage(data.error ?? `บันทึกไม่สำเร็จ (HTTP ${res.status})`)
    } catch (e) {
      // ยิงไม่ถึงเซิร์ฟเวอร์เลย (เน็ตหลุด / server ดับ) — ไม่มี response ให้อ่าน
      setStatus("error")
      setMessage(`เชื่อมต่อ API ไม่ได้: ${e.message}`)
    }
  }

  const label = {
    idle: "🔖 เพิ่มในสูตรโปรด",
    saving: "⏳ กำลังบันทึก...",
    saved: "✅ บันทึกแล้ว",
    exists: "✅ อยู่ในสูตรโปรดแล้ว",
    error: "🔖 ลองอีกครั้ง",
  }[status]

  const done = status === "saved" || status === "exists"

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={status === "saving" || done}
        className={`border px-4 py-2 rounded font-medium ${
          done
            ? "border-green-400 text-green-700 bg-green-50"
            : "hover:border-orange-400"
        } disabled:cursor-default`}
      >
        {label}
      </button>

      {/* ข้อความใต้ปุ่ม — มาจาก { error } ที่ Route Handler ส่งกลับมาจริง */}
      {message && (
        <p
          className={`text-sm mt-2 ${
            status === "error" ? "text-red-700" : "text-gray-500"
          }`}
        >
          {status === "error" ? `❌ ${message}` : message}
        </p>
      )}
    </div>
  )
}
