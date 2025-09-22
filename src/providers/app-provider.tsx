import { Button } from '@/components/ui/button';
import { useRouter } from '@/routes/hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from './theme-provider';
import { AuthProvider } from '@/providers/authContext';
import { OverlayProvider } from './OverlayContext';
import { ModalProvider } from './modalContext';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Disables automatic refetching when the browser window is focused,
      staleTime:60000
    },
  },
});

const ErrorFallback = ({ error }: FallbackProps) => {
  const router = useRouter();
  return (
    <div
      className="flex h-screen w-screen flex-col items-center  justify-center text-red-500"
      role="alert"
    >
      <h2 className="text-2xl font-semibold">
        Ooops, something went wrong :({' '}
      </h2>
      <pre className="text-2xl font-bold">{error.message}</pre>
      <pre>{error.stack}</pre>
      <Button className="mt-4" onClick={() => router.back()}>
        Go back
      </Button>
    </div>
  );
};

export default function AppProvider({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider >
      <Suspense>
        <HelmetProvider>
          <BrowserRouter>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools />
                <OverlayProvider>
                <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                  <ModalProvider>
                  {children}
                  </ModalProvider>
                </ThemeProvider>
                </OverlayProvider>
              </QueryClientProvider>
            </ErrorBoundary>
          </BrowserRouter>
        </HelmetProvider>
      </Suspense>
    </AuthProvider>
  );
}
