import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import { AppError } from './infrastructure/AppError.tsx'
import ErrorBoundary from './infrastructure/ErrorBoundary.tsx'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './providers/AuthProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ErrorBoundary fallback={<AppError />}>
        <FluentProvider theme={webLightTheme} style={{ height: '100%' }}>
          <div className="h-full flex flex-col p-4 gap-4">
            <App />
          </div>
        </FluentProvider>
      </ErrorBoundary>
    </AuthProvider>
  </StrictMode>,
)