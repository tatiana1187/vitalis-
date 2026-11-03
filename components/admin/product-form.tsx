'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import type { Product } from '@/lib/types'
import { btn, field, labelClass } from '@/lib/ui'
import { cn } from '@/lib/utils'

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function ProductForm({ product, onDone }: { product?: Product; onDone: () => void }) {
  const { saveProduct, products } = useStore()
  const [error, setError] = useState('')
  const [preview, setPreview] = useState(product?.image ?? '')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const description = String(data.get('description') ?? '').trim()
    const color = String(data.get('color') ?? '').trim()
    const image = String(data.get('image') ?? '').trim()
    const price = Number(data.get('price'))
    const sizes = String(data.get('sizes') ?? '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)

    if (!name) return setError('El nombre es obligatorio.')
    if (!Number.isFinite(price) || price <= 0) return setError('Ingresá un precio válido.')
    if (!color) return setError('El color es obligatorio.')

    let id = product?.id ?? slugify(name)
    if (!product) {
      let n = 2
      while (products.some((p) => p.id === id)) id = `${slugify(name)}-${n++}`
    }

    saveProduct({ id, name, description, price: Math.round(price), color, image, sizes })
    onDone()
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-3xl border border-border bg-card p-5">
      <h2 className="text-lg font-bold text-primary">{product ? `Editar: ${product.name}` : 'Nuevo producto'}</h2>

      <div className="mt-5 grid gap-4 md:grid-cols-[160px_1fr]">
        <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
          {preview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="Vista previa de la imagen" className="size-full object-cover" />
          )}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="p-name" className={labelClass}>Nombre</label>
            <input id="p-name" name="name" defaultValue={product?.name} required className={field} />
          </div>
          <div>
            <label htmlFor="p-price" className={labelClass}>Precio (ARS)</label>
            <input id="p-price" name="price" type="number" min={1} inputMode="numeric" defaultValue={product?.price} required className={field} />
          </div>
          <div>
            <label htmlFor="p-color" className={labelClass}>Color (para el filtro)</label>
            <input id="p-color" name="color" defaultValue={product?.color} required className={field} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="p-desc" className={labelClass}>Descripción</label>
            <textarea
              id="p-desc"
              name="description"
              rows={3}
              defaultValue={product?.description}
              className={cn(field, 'h-auto py-2')}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="p-image" className={labelClass}>URL de la imagen</label>
            <input
              id="p-image"
              name="image"
              defaultValue={product?.image}
              onChange={(e) => setPreview(e.target.value)}
              placeholder="/products/ambo.png o https://..."
              className={field}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="p-sizes" className={labelClass}>Talles</label>
            <input
              id="p-sizes"
              name="sizes"
              defaultValue={product?.sizes.join(', ')}
              aria-describedby="p-sizes-help"
              className={field}
            />
            <p id="p-sizes-help" className="mt-1 text-xs text-muted-foreground">
              Separados por coma. Si se deja vacío, el talle queda “A confirmar”.
            </p>
          </div>
        </div>
      </div>

      <p role="alert" className={cn('mt-4 text-sm font-medium text-destructive', !error && 'sr-only')}>{error}</p>

      <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button type="button" className={btn.outline} onClick={onDone}>Cancelar</button>
        <button type="submit" className={btn.primary}>Guardar producto</button>
      </div>
    </form>
  )
}
