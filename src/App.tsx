import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import { MarketingLayout } from './components/layout/Layout'
import { Skeleton } from './components/ui/Skeleton'
import { LandingPage } from './pages/LandingPage'

/** Les pages secondaires sont chargées à la demande : l'accueil reste léger
 *  sur connexion 3G, condition indispensable pour nos utilisateurs. */
const PricingPage = lazy(() => import('./pages/PricingPage').then((m) => ({ default: m.PricingPage })))
const AuthPreviewPage = lazy(() =>
  import('./pages/AuthPreviewPage').then((m) => ({ default: m.AuthPreviewPage })),
)
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))

function RouteFallback() {
  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center gap-4 pt-28">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-80 max-w-full" />
      <Skeleton className="mt-4 h-64 w-full max-w-3xl rounded-2xl" />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<MarketingLayout />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<RouteFallback />}>
              <LandingPage />
            </Suspense>
          }
        />
        <Route
          path="/tarifs"
          element={
            <Suspense fallback={<RouteFallback />}>
              <PricingPage />
            </Suspense>
          }
        />
        <Route
          path="/connexion"
          element={
            <Suspense fallback={<RouteFallback />}>
              <AuthPreviewPage mode="login" />
            </Suspense>
          }
        />
        <Route
          path="/inscription"
          element={
            <Suspense fallback={<RouteFallback />}>
              <AuthPreviewPage mode="signup" />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<RouteFallback />}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}
