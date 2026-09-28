import { AnimatePresence, motion } from 'framer-motion'
import { Check, Lock, Loader2, Receipt, ShieldCheck, Smartphone } from 'lucide-react'
import { useEffect, useState } from 'react'

import { paymentDemo } from '../../data/demo'
import { useI18n } from '../../i18n/I18nProvider'
import { cn } from '../../lib/utils'
import { Button } from '../ui/Button'

type PaymentState = 'idle' | 'processing' | 'success'

/**
 * Maquette d'encaissement Mobile Money : MTN MoMo / Orange Money,
 * validation du numéro +237, push sur le téléphone puis reçu.
 */
export function PaymentMock({ className }: { className?: string }) {
  const { locale, fcfa } = useI18n()
  const [operator, setOperator] = useState(paymentDemo.operators[0].id)
  const [phone, setPhone] = useState(paymentDemo.operators[0].number)
  const [state, setState] = useState<PaymentState>('idle')

  useEffect(() => {
    if (state !== 'processing') return
    const timer = window.setTimeout(() => setState('success'), 1800)
    return () => window.clearTimeout(timer)
  }, [state])

  const selected = paymentDemo.operators.find((item) => item.id === operator)!

  return (
    <div className={cn('flex h-full flex-col', className)}>
      <div className="border-b border-line bg-surface-2 px-4 py-3.5">
        <p className="text-[11px] font-bold tracking-wide text-ink-muted uppercase">
          {locale === 'fr' ? 'Montant à régler' : 'Amount due'}
        </p>
        <p className="mt-1 text-2xl font-extrabold text-ink tabular-nums">{fcfa(paymentDemo.amount)}</p>
        <p className="mt-0.5 truncate text-[12px] text-ink-muted">{paymentDemo.label}</p>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden p-4">
        <AnimatePresence mode="wait" initial={false}>
          {state === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="flex h-full flex-col items-center justify-center gap-3 text-center"
            >
              <motion.span
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="grid size-14 place-items-center rounded-full bg-success text-white"
              >
                <Check className="size-7" strokeWidth={3} />
              </motion.span>
              <div>
                <p className="text-[15px] font-extrabold text-ink">
                  {locale === 'fr' ? 'Paiement confirmé' : 'Payment confirmed'}
                </p>
                <p className="mt-1 text-[12.5px] text-ink-muted">
                  {locale === 'fr' ? 'Reçu envoyé par SMS et email' : 'Receipt sent by SMS and email'}
                </p>
              </div>
              <div className="w-full rounded-xl border border-line bg-surface-2 p-3 text-left">
                <div className="flex items-center justify-between py-1">
                  <span className="text-[11.5px] text-ink-muted">{locale === 'fr' ? 'Référence' : 'Reference'}</span>
                  <span className="text-[12px] font-bold text-ink tabular-nums">{paymentDemo.reference}</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-[11.5px] text-ink-muted">{locale === 'fr' ? 'Moyen' : 'Method'}</span>
                  <span className="text-[12px] font-bold text-ink">{selected.name}</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-[11.5px] text-ink-muted">{locale === 'fr' ? 'Reçu PDF' : 'PDF receipt'}</span>
                  <span className="inline-flex items-center gap-1 text-[12px] font-bold text-brand">
                    <Receipt className="size-3.5" />
                    {locale === 'fr' ? 'Disponible' : 'Available'}
                  </span>
                </div>
              </div>
              <Button variant="secondary" size="sm" onClick={() => setState('idle')}>
                {locale === 'fr' ? 'Refaire un paiement' : 'Run another payment'}
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div>
                <p className="mb-2 text-[12px] font-bold text-ink">
                  {locale === 'fr' ? 'Choisissez votre opérateur' : 'Choose your operator'}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {paymentDemo.operators.map((item) => {
                    const isActive = item.id === operator
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setOperator(item.id)
                          setPhone(item.number)
                        }}
                        className={cn(
                          'flex items-center gap-2 rounded-xl border p-2.5 text-left transition-colors duration-200',
                          isActive ? 'border-brand bg-brand-soft' : 'border-line hover:border-line-strong',
                        )}
                      >
                        <span
                          className={cn(
                            'grid size-7 shrink-0 place-items-center rounded-lg text-[10px] font-black text-white',
                            item.id === 'mtn' ? 'bg-[#ffcc00] text-[#4a3200]' : 'bg-[#ff7900]',
                          )}
                        >
                          {item.id === 'mtn' ? 'MoMo' : 'OM'}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-[12px] font-bold text-ink">{item.name}</span>
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label htmlFor="momo-phone" className="mb-1.5 block text-[12px] font-bold text-ink">
                  {locale === 'fr' ? 'Numéro Mobile Money' : 'Mobile Money number'}
                </label>
                <div className="flex h-11 items-center gap-2 rounded-xl border border-line bg-surface-2 px-3 focus-within:border-brand">
                  <span className="text-[13px] font-bold text-ink-muted">+237</span>
                  <input
                    id="momo-phone"
                    type="tel"
                    inputMode="numeric"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    className="min-w-0 flex-1 bg-transparent text-[14px] font-semibold text-ink tabular-nums outline-none"
                    disabled={state === 'processing'}
                  />
                </div>
              </div>

              {state === 'processing' && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2.5 rounded-xl border border-warning/30 bg-warning-soft px-3 py-2.5"
                >
                  <Loader2 className="size-4 shrink-0 animate-spin text-warning" />
                  <p className="text-[11.5px] leading-snug font-semibold text-warning">
                    {locale === 'fr'
                      ? 'Push envoyé sur votre téléphone. Validez avec votre code secret.'
                      : 'Push sent to your phone. Confirm with your secret code.'}
                  </p>
                </motion.div>
              )}

              <div className="flex items-start gap-2 rounded-xl bg-surface-2 p-3">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-success" />
                <p className="text-[11px] leading-relaxed text-ink-muted">
                  {locale === 'fr'
                    ? 'Aucun secret de paiement stocké côté client : la transaction est validée par notre serveur sécurisé.'
                    : 'No payment secret is stored client-side: the transaction is validated by our secure server.'}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="safe-bottom border-t border-line bg-surface px-4 py-3">
        {state === 'success' ? (
          <div className="flex items-center justify-center gap-1.5 text-[11.5px] font-semibold text-ink-subtle">
            <Lock className="size-3.5" />
            {locale === 'fr' ? 'Transaction chiffrée de bout en bout' : 'End-to-end encrypted transaction'}
          </div>
        ) : (
          <Button
            fullWidth
            onClick={() => setState('processing')}
            disabled={state === 'processing'}
            className="group"
          >
            {state === 'processing' ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                {locale === 'fr' ? 'Validation…' : 'Validating…'}
              </>
            ) : (
              <>
                <Smartphone className="size-4" />
                {locale === 'fr' ? `Payer ${fcfa(paymentDemo.amount)}` : `Pay ${fcfa(paymentDemo.amount)}`}
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  )
}
