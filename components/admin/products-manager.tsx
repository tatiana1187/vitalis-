'use client'

import { useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useStore } from '@/lib/store'
import { formatPrice } from '@/lib/format'
import type { Product } from '@/lib/types'
import { btn } from '@/lib/ui'
import { ProductForm } from './product-form'

export function ProductsManager() {
  const { products, deleteProduct } = useStore()
  const [editing, setEditing] = useState<Product | 'new' | null>(null)

  if (editing) {
    return (
      <ProductForm
        product={editing === 'new' ? undefined : editing}
        onDone={() => setEditing(null)}
      />
    )
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-primary">Productos disponibles</h2>
        <button type="button" className={btn.accent} onClick={() => setEditing('new')}>
          <Plus /> Agregar
        </button>
      </div>
      <ul className="flex flex-col gap-2">
        {products.map((p) => (
          <li key={p.id} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.image || '/placeholder.svg'} alt="" className="size-16 shrink-0 rounded-xl object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{p.name}</p>
              <p className="text-sm text-muted-foreground">
                {formatPrice(p.price)} · {p.color}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                Talles: {p.sizes.length ? p.sizes.join(', ') : 'sin cargar'}
              </p>
            </div>
            <button type="button" className={btn.icon} aria-label={`Editar ${p.name}`} onClick={() => setEditing(p)}>
              <Pencil />
            </button>
            <button
              type="button"
              className={`${btn.icon} text-destructive hover:bg-destructive/10`}
              aria-label={`Eliminar ${p.name}`}
              onClick={() => {
                if (window.confirm(`¿Eliminar "${p.name}"?`)) deleteProduct(p.id)
              }}
            >
              <Trash2 />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
