const API = process.env.NEXT_PUBLIC_API_URL

export interface Producto {
  id: number
  nombre: string
  precio: string
  stock: number
}

export interface Pagina<T> {
  content: T[]
  totalElements: number
  totalPages: number
  number: number
  size: number
}

async function manejarRespuesta<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const err = await res.json().catch(() => null)
    throw new Error(err?.message ?? "Error en el servidor")
  }
  return res.json()
}

export async function obtenerProductos(page = 0, size = 12) {
  const res = await fetch(`${API}/productos?page=${page}&size=${size}`)
  return manejarRespuesta<Pagina<Producto>>(res)
}

export async function obtenerProducto(id: number) {
  const res = await fetch(`${API}/productos/${id}`)
  return manejarRespuesta<Producto>(res)
}
