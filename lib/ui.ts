const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0'

export const btn = {
  primary: `${base} h-11 px-6 text-sm bg-primary text-primary-foreground hover:bg-primary/90`,
  accent: `${base} h-11 px-6 text-sm bg-accent text-accent-foreground hover:bg-accent/90`,
  outline: `${base} h-11 px-6 text-sm border border-input bg-card text-foreground hover:bg-secondary`,
  ghost: `${base} h-9 px-3 text-sm text-foreground hover:bg-secondary`,
  icon: `${base} size-10 text-foreground hover:bg-secondary`,
  whatsapp: `${base} h-11 px-6 text-sm bg-[#1f8f4e] text-white hover:bg-[#1a7a43]`,
}

export const field =
  'h-11 w-full rounded-xl border border-input bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

export const labelClass = 'mb-1.5 block text-sm font-medium text-foreground'
