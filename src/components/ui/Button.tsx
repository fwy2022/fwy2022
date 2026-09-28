import { motion, type HTMLMotionProps } from 'framer-motion'
import { forwardRef } from 'react'
import { Link } from 'react-router-dom'

import { cn } from '../../lib/utils'

export type ButtonVariant = 'primary' | 'accent' | 'secondary' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-brand text-on-brand hover:bg-brand-hover shadow-[0_10px_24px_-14px_var(--brand)] hover:shadow-[0_14px_30px_-12px_var(--brand)]',
  accent:
    'bg-accent text-on-accent hover:bg-accent-hover shadow-[0_10px_24px_-14px_var(--accent)] hover:shadow-[0_14px_30px_-12px_var(--accent)]',
  secondary: 'bg-surface-2 text-ink border border-line hover:bg-surface-3 hover:border-line-strong',
  outline: 'border border-line-strong text-ink hover:border-brand hover:text-brand',
  ghost: 'text-ink-muted hover:text-ink hover:bg-surface-2',
  danger: 'bg-danger text-white hover:brightness-110',
}

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-9 gap-1.5 px-3.5 text-[13px] rounded-lg',
  md: 'h-11 gap-2 px-5 text-sm rounded-xl',
  lg: 'h-13 gap-2.5 px-7 text-[15px] rounded-xl',
}

const BASE =
  'relative inline-flex select-none items-center justify-center font-semibold whitespace-nowrap transition-[background-color,color,box-shadow,transform,border-color] duration-200 ease-[var(--ease-out-expo)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50'

type MotionButtonProps = HTMLMotionProps<'button'> & {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
}

export interface ButtonProps extends Omit<MotionButtonProps, 'children'> {
  children?: React.ReactNode
}

/** Bouton d'action principal. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'primary', size = 'md', fullWidth, type = 'button', children, ...props },
  ref,
) {
  return (
    <motion.button
      ref={ref}
      type={type}
      className={cn(BASE, VARIANTS[variant], SIZES[size], fullWidth && 'w-full', className)}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </motion.button>
  )
})

interface ButtonLinkProps {
  to: string
  children: React.ReactNode
  className?: string
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  onClick?: () => void
  'aria-label'?: string
  type?: 'button' | 'submit'
}

/** Même apparence que `Button`, mais rendu en lien de navigation interne. */
export function ButtonLink({
  to,
  children,
  className,
  variant = 'primary',
  size = 'md',
  fullWidth,
  onClick,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(BASE, VARIANTS[variant], SIZES[size], fullWidth && 'w-full', className)}
      {...rest}
    >
      {children}
    </Link>
  )
}
