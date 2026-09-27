"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'หน้าแรก' },
  { href: '/recipes', label: 'สูตรอาหาร' },
  { href: '/my-recipes', label: 'สูตรโปรด' },
  { href: '/about', label: 'เกี่ยวกับ' },
]

export default function Nav() {
  const pathname = usePathname()   // ★ hook — ต้องมี "use client" เพราะเหตุนี้

  return (
    <header className="border-b">
      <nav className="max-w-4xl mx-auto flex gap-6 p-4">
        {links.map(({ href, label }) => {
          // ★ เทียบเท่า NavLink to="/" end ของ React Router — "/" ต้องตรงเป๊ะ ส่วน path อื่น startsWith พอ
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <Link key={href} href={href}
              className={isActive ? 'font-bold text-orange-600' : 'text-gray-600 hover:text-gray-900'}>
              {label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
