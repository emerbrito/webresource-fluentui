import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import { AppError } from './infrastructure/AppError.tsx'
import { MsalProvider } from "@azure/msal-react";
import ErrorBoundary from './infrastructure/ErrorBoundary.tsx'
import App from './App.tsx'
import './index.css'
//import ReactDOM from 'react-dom';
import { msalConfig } from './services/msal-config.ts';
import { PublicClientApplication } from '@azure/msal-browser';

// const pca = new PublicClientApplication(msalConfig);

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <MsalProvider instance={pca}>
//       <ErrorBoundary fallback={<AppError />}>
//         <FluentProvider theme={webLightTheme} style={{ height: '100%' }}>
//           <div className="h-full flex flex-col p-4 gap-4">
//             <App />
//           </div>
//         </FluentProvider>
//       </ErrorBoundary>
//     </MsalProvider>
//   </StrictMode>,
// )

const pca = new PublicClientApplication(msalConfig);

pca.initialize().then(() =>{

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <MsalProvider instance={pca}>
        <ErrorBoundary fallback={<AppError />}>
          <FluentProvider theme={webLightTheme} style={{ height: '100%' }}>
            <div className="h-full flex flex-col p-4 gap-4">
              <App />
            </div>
          </FluentProvider>
        </ErrorBoundary>
      </MsalProvider>
    </StrictMode>,
  )  

}) 
