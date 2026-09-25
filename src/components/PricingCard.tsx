import type { Plan } from '@/lib/plans'

type Props = {
  plan: Plan
  variant?: 'compact' | 'full'
}

const IRIS_20 = 'bg-[linear-gradient(rgba(86,131,218,0.2),rgba(86,131,218,0.2))]'
const body = 'text-body leading-body tracking-body'
const caption = 'text-caption leading-caption tracking-caption'

export function PricingCard({ plan, variant = 'full' }: Props) {
  const highlighted = plan.name === 'Premium'
  const base = `rounded-xl border border-slate-edge bg-charcoal-card p-6 ${highlighted ? IRIS_20 : ''}`

  if (variant === 'compact') {
    return (
      <div className={base}>
        <p className={`${body} font-semibold text-snow mb-1`}>{plan.name}</p>
        <p className={`${body} font-semibold text-snow`}>{plan.price}</p>
      </div>
    )
  }

  return (
    <div className={base}>
      <p className={`${body} font-semibold text-snow mb-1`}>{plan.name}</p>
      <p className={`${body} font-semibold text-snow mb-3`}>{plan.price}</p>
      <ul className={`${caption} text-ash space-y-1 mb-3`}>
        {plan.features.map((f) => (
          <li key={f}>・{f}</li>
        ))}
      </ul>
      <p className={`${caption} text-smoke`}>サポート: {plan.support}</p>
    </div>
  )
}
