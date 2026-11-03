'use client'

import { useMemo, useState } from 'react'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { ProductCard } from './product-card'

const ALL = 'Todos'

export function Catalog() {
  const { products } = useStore()
  const [color, setColor] = useState(ALL)

  const colors = useMemo(() => [ALL, ...Array.from(new Set(products.map((p) => p.color)))], [products])
  const filtered = color === ALL ? products : products.filter((p) => p.color === color)

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <h1 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">Catálogo de productos</h1>
      <p className="mt-2 text-muted-foreground">Explorá todos nuestros ambos y encontrá el tuyo.</p>

      <fieldset className="mt-6">
        <legend className="mb-2 text-sm font-medium text-foreground">Filtrar por color</legend>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2">
          {colors.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={color === c}
              onClick={() => setColor(c)}
              className={cn(
                'h-10 shrink-0 rounded-full border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                color === c
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-input bg-card text-foreground hover:bg-secondary',
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </fieldset>

      <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? 'producto' : 'productos'}
      </p>

      <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((p) => (
          <li key={p.id}>
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </div>
  )
}
