import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MsalAuthenticationTemplate, MsalProvider } from '@azure/msal-react'
import { InteractionType, PublicClientApplication } from '@azure/msal-browser'
import { msalConfig, authRequest } from './authConfig.ts'
import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import { AppError } from './infrastructure/AppError.tsx'
import ErrorBoundary from './infrastructure/ErrorBoundary.tsx'
import App from './App.tsx'
import './index.css'

const msalInstance = new PublicClientApplication(msalConfig)
await msalInstance.initialize()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MsalProvider instance={msalInstance}>
      <MsalAuthenticationTemplate interactionType={InteractionType.Popup} authenticationRequest={authRequest}>
        <ErrorBoundary fallback={<AppError />}>
          <FluentProvider theme={webLightTheme} style={{ height: '100%' }}>
            <div className='h-full flex flex-col p-4 gap-4'>
              <App />
            </div>
          </FluentProvider>
        </ErrorBoundary>
      </MsalAuthenticationTemplate>
    </MsalProvider>
  </StrictMode>
)
