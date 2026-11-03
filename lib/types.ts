export type Product = {
  id: string
  name: string
  description: string
  price: number
  color: string
  image: string
  sizes: string[]
}

export type CartItem = {
  productId: string
  size: string
  quantity: number
}

export type OrderStatus = 'pendiente' | 'confirmado' | 'entregado' | 'cancelado'

export type OrderItem = {
  productId: string
  name: string
  price: number
  size: string
  quantity: number
}

export type Customer = {
  name: string
  phone: string
  email: string
}

export type Order = {
  id: string
  createdAt: string
  customer: Customer
  items: OrderItem[]
  total: number
  status: OrderStatus
}
