import type { Product } from './types'

// Talles vacíos a propósito: se cargan desde /admin con la información real del catálogo.
export const initialProducts: Product[] = [
  { id: 'ambo-verde', name: 'Ambo verde', description: 'Ambo de color verde.', price: 45000, color: 'Verde', image: '/products/ambo-verde.png', sizes: [] },
  { id: 'ambo-blanco-detalles-azules', name: 'Ambo blanco con detalles azules', description: 'Ambo blanco con detalles en azul.', price: 44000, color: 'Blanco', image: '/products/ambo-blanco-azul.png', sizes: [] },
  { id: 'ambo-azul-clasico', name: 'Ambo azul clásico', description: 'Ambo de color azul clásico.', price: 48000, color: 'Azul', image: '/products/ambo-azul-clasico.png', sizes: [] },
  { id: 'ambo-estampado', name: 'Ambo estampado', description: 'Ambo con diseño estampado.', price: 46000, color: 'Estampado', image: '/products/ambo-estampado.png', sizes: [] },
  { id: 'ambo-blanco', name: 'Ambo blanco', description: 'Ambo de color blanco.', price: 42000, color: 'Blanco', image: '/products/ambo-blanco.png', sizes: [] },
  { id: 'ambo-floral-rosa', name: 'Ambo floral rosa', description: 'Ambo rosa con estampado floral.', price: 46000, color: 'Rosa', image: '/products/ambo-floral-rosa.png', sizes: [] },
  { id: 'ambo-negro', name: 'Ambo negro', description: 'Ambo de color negro.', price: 47000, color: 'Negro', image: '/products/ambo-negro.png', sizes: [] },
  { id: 'ambo-azul-cierre', name: 'Ambo azul con cierre', description: 'Ambo azul con cierre.', price: 50000, color: 'Azul', image: '/products/ambo-azul-cierre.png', sizes: [] },
  { id: 'ambo-azul-marino', name: 'Ambo azul marino', description: 'Ambo de color azul marino.', price: 48000, color: 'Azul', image: '/products/ambo-azul-marino.png', sizes: [] },
  { id: 'ambo-verde-botella', name: 'Ambo verde botella', description: 'Ambo de color verde botella.', price: 45000, color: 'Verde', image: '/products/ambo-verde-botella.png', sizes: [] },
  { id: 'ambo-beige', name: 'Ambo beige', description: 'Ambo de color beige.', price: 50000, color: 'Beige', image: '/products/ambo-beige.png', sizes: [] },
  { id: 'ambo-verde-oscuro', name: 'Ambo verde oscuro', description: 'Ambo de color verde oscuro.', price: 48000, color: 'Verde', image: '/products/ambo-verde-oscuro.png', sizes: [] },
]
