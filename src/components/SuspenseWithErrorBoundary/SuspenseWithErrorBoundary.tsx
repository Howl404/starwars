import { DefaultErrorFallback } from '@/components/SuspenseWithErrorBoundary/components/DefaultErrorFallback';
import { DefaultLoadingFallback } from '@/components/SuspenseWithErrorBoundary/components/DefaultLoadingFallback';
import type { SuspenseWithErrorBoundaryProps } from '@/components/SuspenseWithErrorBoundary/SuspenseWithErrorBoundary.types';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export function SuspenseWithErrorBoundary({
  children,
  fallback = <DefaultLoadingFallback />,
  errorFallback: ErrorFallback = DefaultErrorFallback,
  onError,
}: SuspenseWithErrorBoundaryProps) {
  const handleError = (error: Error) => {
    onError?.(error);
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={handleError}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
