import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { formatPrice } from '@/lib/format'
import type { Order } from '@/lib/types'
import { btn } from '@/lib/ui'

export function OrderConfirmation({ order }: { order: Order }) {
  return (
    <div className="mx-auto max-w-xl px-4 py-10 md:py-16">
      <div className="flex flex-col items-center text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-accent/10 text-accent">
          <CheckCircle2 className="size-8" aria-hidden="true" />
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-primary">¡Pedido recibido!</h1>
        <p className="mt-2 text-muted-foreground">
          Gracias, {order.customer.name}. Nos vamos a comunicar al {order.customer.phone} para coordinar la entrega.
        </p>
      </div>

      <section aria-labelledby="resumen-title" className="mt-8 rounded-3xl border border-border bg-card p-5">
        <div className="flex items-center justify-between">
          <h2 id="resumen-title" className="font-bold text-primary">Resumen del pedido</h2>
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">{order.id}</span>
        </div>
        <ul className="mt-4 flex flex-col divide-y divide-border">
          {order.items.map((i) => (
            <li key={`${i.productId}-${i.size}`} className="flex justify-between gap-3 py-3 text-sm">
              <span>
                <span className="font-medium text-foreground">{i.name}</span>
                <span className="block text-muted-foreground">Talle {i.size} · {i.quantity} × {formatPrice(i.price)}</span>
              </span>
              <span className="font-semibold">{formatPrice(i.price * i.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-2 flex justify-between border-t border-border pt-3">
          <span className="font-semibold">Total</span>
          <span className="text-lg font-bold text-primary">{formatPrice(order.total)}</span>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Confirmación enviada a {order.customer.email}.</p>
      </section>

      <Link href="/productos" className={`${btn.primary} mt-6 w-full`}>Seguir comprando</Link>
    </div>
  )
}
