import { motion, useReducedMotion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'

import { useI18n } from '../../i18n/I18nProvider'
import { cn } from '../../lib/utils'
import { useTheme } from '../../theme/ThemeProvider'

/** Bascule clair / sombre avec une icône qui glisse. */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const { m } = useI18n()
  const reduceMotion = useReducedMotion()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? m.theme.light : m.theme.dark}
      title={isDark ? m.theme.light : m.theme.dark}
      className={cn(
        'relative grid size-9.5 place-items-center overflow-hidden rounded-full border border-line bg-surface-2 text-ink-muted transition-colors duration-200 hover:border-line-strong hover:text-ink',
        className,
      )}
    >
      <motion.span
        className="absolute"
        animate={{ y: isDark ? 0 : -22, opacity: isDark ? 1 : 0, rotate: isDark ? 0 : -35 }}
        transition={{ duration: reduceMotion ? 0 : 0.24, ease: [0.16, 1, 0.3, 1] }}
      >
        <Moon className="size-4.5" />
      </motion.span>
      <motion.span
        className="absolute"
        animate={{ y: isDark ? 22 : 0, opacity: isDark ? 0 : 1, rotate: isDark ? 35 : 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.24, ease: [0.16, 1, 0.3, 1] }}
      >
        <Sun className="size-4.5" />
      </motion.span>
    </button>
  )
}
