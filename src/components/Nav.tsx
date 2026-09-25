'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { href: '/', label: 'ホーム' },
  { href: '/tagdeck', label: 'TagDeck' },
  { href: '/business', label: '事業構造' },
  { href: '/org', label: '組織体制' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'お問い合わせ' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b border-slate-edge bg-void">
      <nav className="max-w-[var(--page-max-width)] mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold text-subheading leading-subheading tracking-subheading text-snow">
          TagTech
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-6 text-body leading-body tracking-body">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`transition-colors ${
                  pathname === href
                    ? 'text-snow font-medium'
                    : 'text-ash hover:text-snow'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-ash"
          onClick={() => setOpen(!open)}
          aria-label="メニュー"
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current" />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <ul id="mobile-navigation" className="md:hidden border-t border-slate-edge bg-void">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 text-body leading-body tracking-body border-b border-slate-edge ${
                  pathname === href
                    ? 'text-snow font-medium bg-electric-iris/12'
                    : 'text-ash'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
