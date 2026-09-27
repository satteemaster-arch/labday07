import './globals.css'
import Nav from '@/components/Nav'

export const metadata = {
  title: 'Recipe Browser — Next.js',
  description: 'แปลงจาก React SPA วันที่ 4 มาเป็น Next.js App Router',
}

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1 max-w-4xl mx-auto p-6 w-full">
          {children}
        </main>
        <footer className="border-t p-4 text-center text-sm text-gray-400">
          © 2026 DII CAMT · ข้อมูลจาก TheMealDB
        </footer>
      </body>
    </html>
  )
}
