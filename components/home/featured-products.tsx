'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useStore } from '@/lib/store'
import { ProductCard } from '@/components/product-card'

export function FeaturedProducts() {
  const { products } = useStore()

  return (
    <section aria-labelledby="destacados-title" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Nuestros ambos</p>
          <h2 id="destacados-title" className="mt-1 text-3xl font-bold tracking-tight text-primary md:text-4xl">
            Productos destacados
          </h2>
        </div>
        <Link href="/productos" className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:inline-flex">
          Ver catálogo completo <ArrowRight className="size-4" />
        </Link>
      </div>
      <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {products.map((p) => (
          <li key={p.id}>
            <ProductCard product={p} showActions={false} />
          </li>
        ))}
      </ul>
    </section>
  )
}
