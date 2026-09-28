import { useRegisterSW } from 'virtual:pwa-register/react'

import { useI18n } from '../i18n/I18nProvider'
import { Button } from './ui/Button'
import { useToast } from './ui/Toast'

/**
 * Propose la mise à jour de l'application installée (PWA) sans jamais
 * interrompre l'utilisateur en cours de saisie.
 */
export function PwaUpdater() {
  const { locale } = useI18n()
  const toast = useToast()
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({ immediate: true })

  if (!needRefresh) return null

  return (
    <div className="safe-bottom fixed inset-x-3 bottom-3 z-200 mx-auto max-w-md rounded-2xl border border-line bg-surface p-4 shadow-lift">
      <p className="text-sm font-bold text-ink">
        {locale === 'fr' ? 'Nouvelle version disponible' : 'A new version is available'}
      </p>
      <p className="mt-1 text-[12.5px] text-ink-muted">
        {locale === 'fr'
          ? 'Rechargez pour profiter des nouveautés — vos données sont conservées.'
          : 'Reload to get the latest features — your data is preserved.'}
      </p>
      <div className="mt-3 flex gap-2">
        <Button
          size="sm"
          onClick={() => {
            void updateServiceWorker(true)
            setNeedRefresh(false)
          }}
        >
          {locale === 'fr' ? 'Mettre à jour' : 'Update'}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            setNeedRefresh(false)
            toast.info(
              locale === 'fr' ? 'Mise à jour reportée' : 'Update postponed',
              locale === 'fr'
                ? 'Elle sera proposée à votre prochaine visite.'
                : 'It will be offered on your next visit.',
            )
          }}
        >
          {locale === 'fr' ? 'Plus tard' : 'Later'}
        </Button>
      </div>
    </div>
  )
}
