'use client'

import { Inbox } from 'lucide-react'
import { useStore } from '@/lib/store'
import { formatPrice } from '@/lib/format'
import type { OrderStatus } from '@/lib/types'
import { cn } from '@/lib/utils'

const statuses: { value: OrderStatus; label: string; className: string }[] = [
  { value: 'pendiente', label: 'Pendiente', className: 'bg-amber-100 text-amber-900' },
  { value: 'confirmado', label: 'Confirmado', className: 'bg-sky-100 text-sky-900' },
  { value: 'entregado', label: 'Entregado', className: 'bg-emerald-100 text-emerald-900' },
  { value: 'cancelado', label: 'Cancelado', className: 'bg-rose-100 text-rose-900' },
]

const dateFormatter = new Intl.DateTimeFormat('es-AR', { dateStyle: 'short', timeStyle: 'short' })

export function OrdersList() {
  const { orders, updateOrderStatus } = useStore()

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-3xl border border-dashed border-border bg-card px-6 py-14 text-center">
        <Inbox className="size-10 text-muted-foreground" aria-hidden="true" />
        <p className="mt-3 font-semibold">Todavía no hay pedidos</p>
        <p className="mt-1 text-sm text-muted-foreground">Los pedidos confirmados desde el carrito aparecerán acá.</p>
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-3">
      {orders.map((order) => {
        const status = statuses.find((s) => s.value === order.status)!
        return (
          <li key={order.id}>
            <article className="rounded-2xl border border-border bg-card p-4" aria-labelledby={`order-${order.id}`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 id={`order-${order.id}`} className="font-bold text-primary">
                    {order.id}
                  </h2>
                  <p className="text-xs text-muted-foreground">{dateFormatter.format(new Date(order.createdAt))}</p>
                </div>
                <span className={cn('rounded-full px-3 py-1 text-xs font-semibold', status.className)}>{status.label}</span>
              </div>

              <div className="mt-3 grid gap-1 text-sm">
                <p className="font-medium">{order.customer.name}</p>
                <p className="text-muted-foreground">
                  <a href={`tel:${order.customer.phone}`} className="hover:underline">{order.customer.phone}</a>
                  {' · '}
                  <a href={`mailto:${order.customer.email}`} className="break-all hover:underline">{order.customer.email}</a>
                </p>
              </div>

              <ul className="mt-3 flex flex-col gap-1 border-t border-border pt-3 text-sm">
                {order.items.map((i) => (
                  <li key={`${i.productId}-${i.size}`} className="flex justify-between gap-3">
                    <span>{i.quantity} × {i.name} <span className="text-muted-foreground">(Talle {i.size})</span></span>
                    <span className="shrink-0 font-medium">{formatPrice(i.price * i.quantity)}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
                <p className="font-bold">Total: {formatPrice(order.total)}</p>
                <div className="flex items-center gap-2">
                  <label htmlFor={`status-${order.id}`} className="text-sm text-muted-foreground">Estado</label>
                  <select
                    id={`status-${order.id}`}
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                    className="h-10 rounded-xl border border-input bg-card px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {statuses.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </article>
          </li>
        )
      })}
    </ul>
  )
}
