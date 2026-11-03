import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { formatPrice, productWhatsappMessage, whatsappLink } from '@/lib/format'
import type { Product } from '@/lib/types'
import { btn } from '@/lib/ui'
import { cn } from '@/lib/utils'

export function ProductCard({ product, showActions = true }: { product: Product; showActions?: boolean }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/productos/${product.id}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring" tabIndex={-1} aria-hidden="true">
        <div className="aspect-[4/5] overflow-hidden bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image || '/placeholder.svg'}
            alt=""
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">{product.color}</span>
        <h3 className="text-base font-semibold leading-snug text-foreground">
          <Link href={`/productos/${product.id}`} className="hover:underline focus-visible:outline-none focus-visible:underline">
            {product.name}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
        <p className="mt-auto pt-1 text-lg font-bold text-primary">{formatPrice(product.price)}</p>
        {showActions && (
          <div className="mt-2 flex flex-col gap-2">
            <Link href={`/productos/${product.id}`} className={btn.primary}>
              Ver detalles
              <span className="sr-only"> de {product.name}</span>
            </Link>
            <a
              href={whatsappLink(productWhatsappMessage(product.name, product.price))}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(btn.outline, 'text-[#1a7a43]')}
            >
              <MessageCircle />
              Consultar por WhatsApp
              <span className="sr-only"> sobre {product.name}</span>
            </a>
          </div>
        )}
      </div>
    </article>
  )
}
