import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { UIOptionsProvider } from 'context/UIOptionsContext'
import App from './App'
import './i18n'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <UIOptionsProvider>
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <App />
        <ReactQueryDevtools />
      </React.StrictMode>
    </QueryClientProvider>
  </UIOptionsProvider>
)
