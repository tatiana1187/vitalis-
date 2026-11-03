import type { Metadata } from 'next'
import { Catalog } from '@/components/catalog'

export const metadata: Metadata = {
  title: 'Catálogo | Vitalis+',
  description: 'Todos los ambos y uniformes médicos de Vitalis+. Filtrá por color y consultá por WhatsApp.',
}

export default function ProductsPage() {
  return <Catalog />
}
