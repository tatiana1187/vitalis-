'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { initialProducts } from './products'
import type { CartItem, Customer, Order, OrderStatus, Product } from './types'

const STORAGE_KEY = 'vitalis-session-v1'

type StoreState = {
  products: Product[]
  cart: CartItem[]
  orders: Order[]
}

type StoreContextValue = StoreState & {
  hydrated: boolean
  getProduct: (id: string) => Product | undefined
  addToCart: (item: CartItem) => void
  updateCartQuantity: (productId: string, size: string, quantity: number) => void
  removeFromCart: (productId: string, size: string) => void
  cartCount: number
  cartTotal: number
  placeOrder: (customer: Customer) => Order | null
  saveProduct: (product: Product) => void
  deleteProduct: (id: string) => void
  updateOrderStatus: (id: string, status: OrderStatus) => void
}

const StoreContext = createContext<StoreContextValue | null>(null)

const defaultState: StoreState = { products: initialProducts, cart: [], orders: [] }

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StoreState>(defaultState)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY)
      if (saved) setState({ ...defaultState, ...JSON.parse(saved) })
    } catch {
      // Datos de sesión corruptos: se usan los valores iniciales.
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state, hydrated])

  const getProduct = useCallback(
    (id: string) => state.products.find((p) => p.id === id),
    [state.products],
  )

  const addToCart = useCallback((item: CartItem) => {
    setState((s) => {
      const existing = s.cart.find((c) => c.productId === item.productId && c.size === item.size)
      const cart = existing
        ? s.cart.map((c) =>
            c === existing ? { ...c, quantity: Math.min(99, c.quantity + item.quantity) } : c,
          )
        : [...s.cart, item]
      return { ...s, cart }
    })
  }, [])

  const updateCartQuantity = useCallback((productId: string, size: string, quantity: number) => {
    setState((s) => ({
      ...s,
      cart: s.cart.map((c) =>
        c.productId === productId && c.size === size
          ? { ...c, quantity: Math.max(1, Math.min(99, quantity)) }
          : c,
      ),
    }))
  }, [])

  const removeFromCart = useCallback((productId: string, size: string) => {
    setState((s) => ({
      ...s,
      cart: s.cart.filter((c) => !(c.productId === productId && c.size === size)),
    }))
  }, [])

  const cartCount = state.cart.reduce((sum, c) => sum + c.quantity, 0)
  const cartTotal = state.cart.reduce((sum, c) => {
    const product = state.products.find((p) => p.id === c.productId)
    return sum + (product ? product.price * c.quantity : 0)
  }, 0)

  const placeOrder = useCallback(
    (customer: Customer) => {
      const items = state.cart.flatMap((c) => {
        const product = state.products.find((p) => p.id === c.productId)
        return product
          ? [{ productId: product.id, name: product.name, price: product.price, size: c.size, quantity: c.quantity }]
          : []
      })
      if (items.length === 0) return null
      const order: Order = {
        id: `VP-${Date.now().toString().slice(-6)}`,
        createdAt: new Date().toISOString(),
        customer,
        items,
        total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        status: 'pendiente',
      }
      setState((s) => ({ ...s, cart: [], orders: [order, ...s.orders] }))
      return order
    },
    [state.cart, state.products],
  )

  const saveProduct = useCallback((product: Product) => {
    setState((s) => {
      const exists = s.products.some((p) => p.id === product.id)
      return {
        ...s,
        products: exists
          ? s.products.map((p) => (p.id === product.id ? product : p))
          : [...s.products, product],
      }
    })
  }, [])

  const deleteProduct = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      products: s.products.filter((p) => p.id !== id),
      cart: s.cart.filter((c) => c.productId !== id),
    }))
  }, [])

  const updateOrderStatus = useCallback((id: string, status: OrderStatus) => {
    setState((s) => ({
      ...s,
      orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)),
    }))
  }, [])

  const value = useMemo<StoreContextValue>(
    () => ({
      ...state,
      hydrated,
      getProduct,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      cartCount,
      cartTotal,
      placeOrder,
      saveProduct,
      deleteProduct,
      updateOrderStatus,
    }),
    [state, hydrated, getProduct, addToCart, updateCartQuantity, removeFromCart, cartCount, cartTotal, placeOrder, saveProduct, deleteProduct, updateOrderStatus],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore debe usarse dentro de StoreProvider')
  return ctx
}
