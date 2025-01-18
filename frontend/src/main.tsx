import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen.ts'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './state/state.ts'
import { ThemeProvider } from './components/theme-provider.tsx'
import { Toaster } from './components/ui/toaster.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="dark">
            <QueryClientProvider client={queryClient}>
                <ReduxProvider store={store}>
                    <RouterProvider router={router} />
                    <Toaster></Toaster>
                </ReduxProvider>
            </QueryClientProvider>
        </ThemeProvider>
    </StrictMode>
)
