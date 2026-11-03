'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, Check, MessageCircle, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useStore } from '@/lib/store'
import { formatPrice, productWhatsappMessage, whatsappLink } from '@/lib/format'
import { btn, field, labelClass } from '@/lib/ui'
import { cn } from '@/lib/utils'

export const SIZE_TO_CONFIRM = 'A confirmar'

export function ProductDetail({ id }: { id: string }) {
  const { getProduct, addToCart, hydrated } = useStore()
  const product = getProduct(id)
  const [size, setSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        {hydrated && (
          <>
            <h1 className="text-2xl font-bold text-primary">Producto no encontrado</h1>
            <p className="mt-2 text-muted-foreground">El producto que buscás no está disponible.</p>
            <Link href="/productos" className={cn(btn.primary, 'mt-6')}>
              Volver al catálogo
            </Link>
          </>
        )}
      </div>
    )
  }

  const hasSizes = product.sizes.length > 0
  const selectedSize = hasSizes ? size || product.sizes[0] : SIZE_TO_CONFIRM

  const handleAdd = () => {
    addToCart({ productId: product.id, size: selectedSize, quantity })
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:py-12">
      <Link href="/productos" className="inline-flex items-center gap-1 rounded text-sm font-medium text-muted-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <ArrowLeft className="size-4" aria-hidden="true" /> Volver al catálogo
      </Link>

      <div className="mt-4 grid gap-8 md:grid-cols-2 md:gap-12">
        <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.image || '/placeholder.svg'} alt={product.name} className="size-full object-cover" />
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">{product.color}</span>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-primary md:text-4xl">{product.name}</h1>
            <p className="mt-3 text-2xl font-bold text-foreground">{formatPrice(product.price)}</p>
          </div>
          <p className="leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="talle" className={labelClass}>Talle</label>
              {hasSizes ? (
                <select id="talle" className={field} value={selectedSize} onChange={(e) => setSize(e.target.value)}>
                  {product.sizes.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              ) : (
                <select id="talle" className={field} disabled aria-describedby="talle-ayuda">
                  <option>{SIZE_TO_CONFIRM}</option>
                </select>
              )}
            </div>
            <div>
              <label htmlFor="cantidad" className={labelClass}>Cantidad</label>
              <div className="flex h-11 items-center rounded-xl border border-input bg-card">
                <button
                  type="button"
                  aria-label="Disminuir cantidad"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex size-11 items-center justify-center rounded-l-xl hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Minus className="size-4" />
                </button>
                <input
                  id="cantidad"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={99}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Math.min(99, Number(e.target.value) || 1)))}
                  className="h-full w-full min-w-0 bg-transparent text-center text-sm font-semibold focus-visible:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  type="button"
                  aria-label="Aumentar cantidad"
                  onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                  className="flex size-11 items-center justify-center rounded-r-xl hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Plus className="size-4" />
                </button>
              </div>
            </div>
          </div>
          {!hasSizes && (
            <p id="talle-ayuda" className="-mt-2 text-sm text-muted-foreground">
              Consultanos por WhatsApp los talles disponibles para este modelo.
            </p>
          )}

          <div className="flex flex-col gap-3">
            <button type="button" onClick={handleAdd} className={btn.primary}>
              {added ? <Check /> : <ShoppingBag />}
              {added ? 'Agregado al carrito' : 'Agregar al carrito'}
            </button>
            <a
              href={whatsappLink(productWhatsappMessage(product.name, product.price, hasSizes ? selectedSize : undefined))}
              target="_blank"
              rel="noopener noreferrer"
              className={btn.whatsapp}
            >
              <MessageCircle />
              Consultar disponibilidad por WhatsApp
            </a>
          </div>
          <p role="status" className="min-h-5 text-sm font-medium text-accent">
            {added && (
              <>
                Producto agregado.{' '}
                <Link href="/carrito" className="underline">Ir al carrito</Link>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
