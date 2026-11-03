import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { whatsappLink } from '@/lib/format'
import { btn } from '@/lib/ui'
import { Logo } from './logo'

export function SiteFooter() {
  return (
    <footer id="contacto" className="scroll-mt-16 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div className="flex flex-col gap-3">
          <Logo inverted />
          <p className="max-w-xs text-sm leading-relaxed text-primary-foreground/75">
            Indumentaria profesional para el área de salud. Comodidad, calidad y diseño en cada ambo.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold">Contacto</h2>
          <p className="mt-3 text-sm leading-relaxed text-primary-foreground/75">
            ¿Tenés dudas sobre un producto, talles o disponibilidad? Escribinos y te respondemos a la brevedad.
          </p>
          <a
            href={whatsappLink('Hola Vitalis+! Quisiera hacer una consulta.')}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btn.whatsapp} mt-4`}
          >
            <MessageCircle />
            Escribinos por WhatsApp
          </a>
        </div>

        <nav aria-label="Pie de página">
          <h2 className="text-base font-semibold">Navegación</h2>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-primary-foreground/75">
            <li><Link className="hover:text-primary-foreground hover:underline" href="/productos">Catálogo</Link></li>
            <li><Link className="hover:text-primary-foreground hover:underline" href="/carrito">Carrito</Link></li>
            <li><Link className="hover:text-primary-foreground hover:underline" href="/#nosotros">¿Quiénes somos?</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-primary-foreground/15">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-primary-foreground/60">
          © {new Date().getFullYear()} Vitalis+. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
