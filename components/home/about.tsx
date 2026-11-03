export function About() {
  return (
    <section id="nosotros" aria-labelledby="nosotros-title" className="scroll-mt-16 bg-secondary">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-2 md:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Nuestra historia</p>
          <h2 id="nosotros-title" className="mt-1 text-3xl font-bold tracking-tight text-primary md:text-4xl">
            ¿Quiénes somos?
          </h2>
        </div>
        <div className="flex flex-col gap-4 leading-relaxed text-foreground">
          <p>
            Vitalis+ nace con una idea simple: que quienes cuidan de otros también se sientan cuidados. Somos un
            emprendimiento dedicado a la indumentaria profesional para el área de salud.
          </p>
          <p>
            Nuestro propósito es acompañar a cada profesional en su día a día con ambos que combinen comodidad, calidad y
            diseño, para que puedan enfocarse en lo que realmente importa: su trabajo y sus pacientes.
          </p>
        </div>
      </div>
    </section>
  )
}
