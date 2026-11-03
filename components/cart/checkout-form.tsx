'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { formatPrice } from '@/lib/format'
import type { Order } from '@/lib/types'
import { btn, field, labelClass } from '@/lib/ui'
import { cn } from '@/lib/utils'

export function CheckoutForm({ onConfirmed }: { onConfirmed: (order: Order) => void }) {
  const { cartTotal, cartCount, placeOrder } = useStore()
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()

    if (name.length < 2) return setError('Ingresá tu nombre.')
    if (!/^[+\d\s()-]{6,20}$/.test(phone)) return setError('Ingresá un teléfono válido.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('Ingresá un correo electrónico válido.')

    const order = placeOrder({ name, phone, email })
    if (order) {
      window.scrollTo({ top: 0 })
      onConfirmed(order)
    }
  }

  return (
    <aside className="h-fit rounded-3xl border border-border bg-card p-5 lg:sticky lg:top-20">
      <h2 className="text-lg font-bold text-primary">Resumen</h2>
      <dl className="mt-4 flex flex-col gap-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Subtotal ({cartCount} {cartCount === 1 ? 'producto' : 'productos'})</dt>
          <dd className="font-medium">{formatPrice(cartTotal)}</dd>
        </div>
        <div className="flex justify-between border-t border-border pt-3 text-base">
          <dt className="font-semibold">Total</dt>
          <dd className="font-bold text-primary">{formatPrice(cartTotal)}</dd>
        </div>
      </dl>

      <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4" aria-labelledby="datos-title">
        <h3 id="datos-title" className="font-semibold text-foreground">Tus datos</h3>
        <div>
          <label htmlFor="name" className={labelClass}>Nombre completo</label>
          <input id="name" name="name" autoComplete="name" required className={field} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Teléfono</label>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required className={field} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Correo electrónico</label>
          <input id="email" name="email" type="email" autoComplete="email" required className={field} />
        </div>
        <p role="alert" className={cn('text-sm font-medium text-destructive', !error && 'sr-only')}>
          {error}
        </p>
        <button type="submit" className={btn.accent}>Confirmar pedido</button>
      </form>
    </aside>
  )
}
