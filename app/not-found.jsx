import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="text-center py-16">
      <h1 className="text-3xl font-bold">404 — ไม่พบหน้านี้</h1>
      <p className="mt-2 text-gray-500">URL ที่คุณเข้าไม่มีอยู่จริง</p>
      <Link href="/" className="border px-4 py-2 rounded mt-4 inline-block">← กลับหน้าแรก</Link>
    </div>
  )
}
