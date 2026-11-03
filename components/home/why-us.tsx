import { Feather, Ruler, ShieldCheck, Sparkles } from 'lucide-react'

const reasons = [
  { icon: ShieldCheck, title: 'Calidad de materiales', text: 'Prendas pensadas para acompañarte en jornadas largas.' },
  { icon: Sparkles, title: 'Diseños modernos', text: 'Colores y estilos actuales para verte bien en tu trabajo.' },
  { icon: Ruler, title: 'Variedad de talles', text: 'Consultanos por el talle ideal para vos.' },
  { icon: Feather, title: 'Comodidad', text: 'Libertad de movimiento durante todo el día.' },
]

export function WhyUs() {
  return (
    <section aria-labelledby="porque-title" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
      <p className="text-sm font-semibold uppercase tracking-wider text-accent">Lo que nos distingue</p>
      <h2 id="porque-title" className="mt-1 text-3xl font-bold tracking-tight text-primary md:text-4xl">
        ¿Por qué elegir Vitalis+?
      </h2>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map(({ icon: Icon, title, text }) => (
          <li key={title} className="rounded-2xl border border-border bg-card p-6">
            <span className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-semibold text-primary">{title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
