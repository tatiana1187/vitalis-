import type { Metadata } from 'next'
import { Cart } from '@/components/cart/cart'

export const metadata: Metadata = {
  title: 'Carrito | Vitalis+',
}

export default function CartPage() {
  return <Cart />
}
