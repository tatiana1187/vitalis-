'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { formatPrice } from '@/lib/format'
import { cn } from '@/lib/utils'
import { ProductsManager } from './products-manager'
import { OrdersList } from './orders-list'

type Tab = 'pedidos' | 'productos'

export function AdminPanel() {
  const { orders, products } = useStore()
  const [tab, setTab] = useState<Tab>('pedidos')

  const activeOrders = orders.filter((o) => o.status !== 'cancelado')
  const salesTotal = activeOrders.reduce((sum, o) => sum + o.total, 0)
  const pending = orders.filter((o) => o.status === 'pendiente').length

  const stats = [
    { label: 'Pedidos recibidos', value: String(orders.length) },
    { label: 'Pendientes', value: String(pending) },
    { label: 'Ventas estimadas', value: formatPrice(salesTotal) },
    { label: 'Productos', value: String(products.length) },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <h1 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">Panel de administración</h1>
      <p className="mt-2 text-sm text-muted-foreground">Los cambios se guardan durante la sesión actual.</p>

      <dl className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.label} className={cn('rounded-2xl border border-border p-4', i === 2 ? 'bg-primary text-primary-foreground' : 'bg-card')}>
            <dt className={cn('text-xs font-medium', i === 2 ? 'text-primary-foreground/75' : 'text-muted-foreground')}>{s.label}</dt>
            <dd className="mt-1 text-xl font-bold md:text-2xl">{s.value}</dd>
          </div>
        ))}
      </dl>

      <div role="tablist" aria-label="Secciones del panel" className="mt-8 inline-flex rounded-full border border-border bg-card p-1">
        {(['pedidos', 'productos'] as const).map((t) => (
          <button
            key={t}
            id={`tab-${t}`}
            role="tab"
            type="button"
            aria-selected={tab === t}
            aria-controls={`panel-${t}`}
            onClick={() => setTab(t)}
            className={cn(
              'h-10 rounded-full px-5 text-sm font-semibold capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              tab === t ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-secondary',
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`} className="mt-6">
        {tab === 'pedidos' ? <OrdersList /> : <ProductsManager />}
      </div>
    </div>
  )
}
