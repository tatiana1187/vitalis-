'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { useStore } from '@/lib/store'
import { btn } from '@/lib/ui'
import { cn } from '@/lib/utils'
import { Logo } from './logo'

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/productos', label: 'Productos' },
  { href: '/#nosotros', label: 'Nosotros' },
  { href: '/#contacto', label: 'Contacto' },
  { href: '/admin', label: 'Admin' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const { cartCount, hydrated } = useStore()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={pathname === l.href ? 'page' : undefined}
                  className={cn(btn.ghost, pathname === l.href && 'text-accent')}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <Link href="/carrito" className={cn(btn.icon, 'relative')} aria-label={`Carrito, ${hydrated ? cartCount : 0} productos`}>
            <ShoppingBag />
            {hydrated && cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-bold text-accent-foreground">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            className={cn(btn.icon, 'md:hidden')}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-movil" aria-label="Menú móvil" className="border-t border-border bg-background md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === l.href ? 'page' : undefined}
                  className="block rounded-lg px-3 py-3 text-base font-medium hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
