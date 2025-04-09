// src/providers/DevAuthProvider.tsx
import { ReactNode } from 'react';
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from '../services/msal-config';

export const DevAuthProvider = ({ children }: { children: ReactNode }) => {
  // We'll initialize MSAL here to avoid the async initialization
  const pca = new PublicClientApplication(msalConfig);
  
  return (
    <MsalProvider instance={pca}>
      {children}
    </MsalProvider>
  );
};