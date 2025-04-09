import { useEffect } from 'react';
import './App.css'
import { AppToolbar } from './components/AppToolbar'
import { PageHeader } from './components/PageHeader'
// import { getRequiredDataParameter } from './infrastructure/services/dataParameterService';
// import { useGlobalStore } from './store/globalStore';
//import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from './services/msal-config';

function App() {

  // useEffect(() => {

  //   if (import.meta.env.MODE !== "development") {
  //     const data = getRequiredDataParameter();
  //     console.log("Query param data:", data);
  //     setDataParameters(data);
  //   } else {
  //     console.log("Skipping data parameter parsing in development mode.");
  //   }   
    
  // }, [setDataParameters]);  

  const { instance, accounts } = useMsal();
  const isLoggedIn = accounts.length > 0;

  useEffect(() => {
    // On initial load, if user isn't logged in, try to acquire a token silently.
    // If that fails, fallback to showing the login popup.
    if (!isLoggedIn) {
      instance.acquireTokenSilent({
        ...loginRequest,
        account: undefined, // No specific account, let MSAL try to find one
      })
      .then((response) => {
        // If we get here, the user was silently signed in with an active session.
        console.log("Silent token acquired", response.accessToken);
      })
      .catch((error) => {
        console.log("Silent acquisition failed, triggering loginPopup:", error);
        // If silent SSO fails, user has no session, so prompt to sign in
        instance.loginPopup(loginRequest).catch((loginError) => {
          console.error("Login popup failed:", loginError);
        });
      });
    }
  }, [isLoggedIn, instance]);  

  const handleLogin = async () => {
    try {
      await instance.loginPopup(loginRequest);
    } catch (error) {
      console.log("Login failed:", error);
    }
  };

  const handleLogout = () => {
    instance.logoutPopup(); 
    // or instance.logoutRedirect()
  };


  return (
    <>
      <nav className='container-card'>
        <AppToolbar />
      </nav>    

      <header className='container-card sm:p-2 lg:pl-5'>
        <PageHeader title='User Dashboard' />
      </header>         

      <main className="container-card grow overflow-y-auto sm:p-2 lg:pl-5">
        <div style={{ margin: "2rem" }}>
        <h1>MSAL + React 18 + Dataverse</h1>
        {!isLoggedIn ? (
          <button onClick={handleLogin}>Sign In</button>
        ) : (
          <button onClick={handleLogout}>Sign Out</button>
        )}
        {isLoggedIn && <p>Welcome, {accounts[0].username}!</p>}
    </div> 
      </main>
    </>
  )
}

export default App
