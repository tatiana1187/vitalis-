"use client"

import { useEffect, useState } from "react"
import { obtenerProductos, type Producto } from "@/lib/api"

export default function Page() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    obtenerProductos()
      .then((data) => setProductos(data.content))
      .catch((e) => setError(e.message))
  }, [])

  if (error) return <p>{error}</p>

  return (
    <div>
      {productos.map((p) => (
        <div key={p.id}>
          <h3>{p.nombre}</h3>
          <p>${Number(p.precio).toFixed(2)}</p>
        </div>
      ))}
    </div>
  )
}
