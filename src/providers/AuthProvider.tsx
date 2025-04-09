// src/providers/AuthProvider.tsx
import { ReactNode, useState, useEffect } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Only in development
  if (import.meta.env.DEV) {
    const DevMsalProvider = () => {
      const [provider, setProvider] = useState<JSX.Element | null>(null);
      const [loading, setLoading] = useState(true);
      
      useEffect(() => {
        const loadMsal = async () => {
          try {
            // Import all required MSAL components
            const { MsalProvider } = await import('@azure/msal-react');
            const { PublicClientApplication } = await import('@azure/msal-browser');
            const { msalConfig } = await import('../services/msal-config');
            
            // Create the MSAL instance
            const pca = new PublicClientApplication(msalConfig);
            await pca.initialize();
            
            // Create the wrapped component with proper provider
            setProvider(
              <MsalProvider instance={pca}>
                {children}
              </MsalProvider>
            );
          } catch (error) {
            console.error('Failed to load MSAL:', error);
          } finally {
            setLoading(false);
          }
        };
        
        loadMsal();
      }, []);
      
      if (loading) {
        return <div>Loading auth provider...</div>;
      }
      
      return provider || <>{children}</>;
    };
    
    return <DevMsalProvider />;
  }
  
  // In production, no MSAL
  return <>{children}</>;
}