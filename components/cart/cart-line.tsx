'use client'

import { Minus, Plus, Trash2 } from 'lucide-react'
import { useStore } from '@/lib/store'
import { formatPrice } from '@/lib/format'
import type { CartItem, Product } from '@/lib/types'

const stepBtn =
  'flex size-9 items-center justify-center rounded-full hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40'

export function CartLine({ item, product }: { item: CartItem; product: Product }) {
  const { updateCartQuantity, removeFromCart } = useStore()

  return (
    <article className="flex gap-4 rounded-2xl border border-border bg-card p-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={product.image || '/placeholder.svg'} alt="" className="h-28 w-22 shrink-0 rounded-xl object-cover" />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h2 className="truncate font-semibold text-foreground">{product.name}</h2>
            <p className="text-sm text-muted-foreground">Talle: {item.size}</p>
            <p className="text-sm text-muted-foreground">{formatPrice(product.price)} c/u</p>
          </div>
          <button
            type="button"
            onClick={() => removeFromCart(item.productId, item.size)}
            aria-label={`Eliminar ${product.name} del carrito`}
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <div className="flex items-center gap-1 rounded-full border border-input" role="group" aria-label={`Cantidad de ${product.name}`}>
            <button
              type="button"
              className={stepBtn}
              aria-label="Disminuir cantidad"
              disabled={item.quantity <= 1}
              onClick={() => updateCartQuantity(item.productId, item.size, item.quantity - 1)}
            >
              <Minus className="size-4" />
            </button>
            <span className="w-6 text-center text-sm font-semibold" aria-live="polite">{item.quantity}</span>
            <button
              type="button"
              className={stepBtn}
              aria-label="Aumentar cantidad"
              disabled={item.quantity >= 99}
              onClick={() => updateCartQuantity(item.productId, item.size, item.quantity + 1)}
            >
              <Plus className="size-4" />
            </button>
          </div>
          <p className="font-bold text-primary">{formatPrice(product.price * item.quantity)}</p>
        </div>
      </div>
    </article>
  )
}
