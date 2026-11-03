'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import { useStore } from '@/lib/store'
import type { Order } from '@/lib/types'
import { btn } from '@/lib/ui'
import { cn } from '@/lib/utils'
import { CartLine } from './cart-line'
import { CheckoutForm } from './checkout-form'
import { OrderConfirmation } from './order-confirmation'

export function Cart() {
  const { cart, getProduct, hydrated } = useStore()
  const [confirmed, setConfirmed] = useState<Order | null>(null)

  if (confirmed) return <OrderConfirmation order={confirmed} />

  if (!hydrated) return <div className="mx-auto min-h-[50vh] max-w-6xl px-4 py-10" aria-busy="true" />

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <h1 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">Tu carrito</h1>

      {cart.length === 0 ? (
        <div className="mt-8 flex flex-col items-center rounded-3xl border border-dashed border-border bg-card px-6 py-16 text-center">
          <ShoppingBag className="size-10 text-muted-foreground" aria-hidden="true" />
          <p className="mt-4 font-semibold text-foreground">Tu carrito está vacío</p>
          <p className="mt-1 text-sm text-muted-foreground">Explorá nuestros ambos y agregá los que más te gusten.</p>
          <Link href="/productos" className={cn(btn.primary, 'mt-6')}>Ver productos</Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          <ul className="flex flex-col gap-3" aria-label="Productos en el carrito">
            {cart.map((item) => {
              const product = getProduct(item.productId)
              return product ? (
                <li key={`${item.productId}-${item.size}`}>
                  <CartLine item={item} product={product} />
                </li>
              ) : null
            })}
          </ul>
          <CheckoutForm onConfirmed={setConfirmed} />
        </div>
      )}
    </div>
  )
}
