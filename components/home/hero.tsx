import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { btn } from '@/lib/ui'

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-12 pt-8 md:grid-cols-2 md:gap-12 md:py-20">
        <div className="flex flex-col gap-5">
          <span className="w-fit rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Indumentaria profesional para la salud
          </span>
          <h1 id="hero-title" className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-primary md:text-6xl">
            Vitalis<span className="text-accent">+</span>
          </h1>
          <p className="text-pretty text-xl font-medium leading-relaxed text-foreground md:text-2xl">
            Vestí tu vocación con comodidad y estilo.
          </p>
          <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
            Ambos pensados para acompañarte en cada jornada, con la calidad y el diseño que tu profesión merece.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/productos" className={btn.primary}>
              Ver productos
              <ArrowRight />
            </Link>
            <Link href="/#nosotros" className={btn.outline}>
              Conocenos
            </Link>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-muted shadow-lg md:aspect-square">
          <Image
            src="/hero.png"
            alt="Profesionales de la salud vistiendo ambos Vitalis+ en una clínica"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
