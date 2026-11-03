const priceFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
})

export function formatPrice(value: number) {
  return priceFormatter.format(value)
}

// Completar con el número de WhatsApp de Vitalis+ en formato internacional (ej: 5491112345678).
export const WHATSAPP_NUMBER = ''

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function productWhatsappMessage(name: string, price: number, size?: string) {
  const sizeText = size ? ` en talle ${size}` : ''
  return `Hola Vitalis+! Quiero consultar por el ${name}${sizeText} (${formatPrice(price)}). ¿Está disponible?`
}
