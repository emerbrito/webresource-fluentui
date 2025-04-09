
import { useEffect, useState } from 'react';

// This component will only be imported in development
export default function DevAuth() {
  const [authUI, setAuthUI] = useState<JSX.Element | null>(null);
  
  useEffect(() => {
    const loadMsalAuth = async () => {
      try {
        // Dynamically import MSAL
        const msalReact = await import('@azure/msal-react');
        const msalConfig = await import('../../services/msal-config');
        
        const MsalAuthContent = () => {
          const { instance, accounts } = msalReact.useMsal();
          const loggedIn = accounts.length > 0;
          
          useEffect(() => {
            if (!loggedIn) {
              instance.acquireTokenSilent({
                ...msalConfig.loginRequest,
                account: undefined,
              })
              .then((response) => {
                console.log("Silent token acquired", response.accessToken);
              })
              .catch((error) => {
                console.log("Silent acquisition failed, triggering loginPopup:", error);
                instance.loginPopup(msalConfig.loginRequest).catch((loginError) => {
                  console.error("Login popup failed:", loginError);
                });
              });
            }
          }, [loggedIn, instance]);
          
          const handleLogin = async () => {
            try {
              await instance.loginPopup(msalConfig.loginRequest);
            } catch (error) {
              console.log("Login failed:", error);
            }
          };
          
          const handleLogout = () => {
            instance.logoutPopup();
          };
          
          return (
            <div style={{ margin: "2rem" }}>
              <h1>MSAL + React 18 + Dataverse</h1>
              {!loggedIn ? (
                <button onClick={handleLogin}>Sign In</button>
              ) : (
                <button onClick={handleLogout}>Sign Out</button>
              )}
              {loggedIn && <p>Welcome, {accounts[0].username}!</p>}
            </div>
          );
        };
        
        setAuthUI(<MsalAuthContent />);
      } catch (error) {
        console.error("Failed to load MSAL components:", error);
      }
    };
    
    loadMsalAuth();
  }, []);
  
  return authUI || <div style={{ margin: "2rem" }}><h1>Loading auth...</h1></div>;
}