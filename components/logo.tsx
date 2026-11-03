import { cn } from '@/lib/utils'

export function Logo({ className, inverted }: { className?: string; inverted?: boolean }) {
  return (
    <span className={cn('flex items-center gap-2 text-xl font-extrabold tracking-tight', inverted ? 'text-primary-foreground' : 'text-primary', className)}>
      <span
        aria-hidden="true"
        className="flex size-8 items-center justify-center rounded-lg bg-accent text-lg leading-none text-accent-foreground"
      >
        +
      </span>
      <span>
        Vitalis<span className="text-accent">+</span>
      </span>
    </span>
  )
}
