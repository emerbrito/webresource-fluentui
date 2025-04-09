import { Configuration } from "@azure/msal-browser";

export const msalConfig: Configuration = {
    auth: {
      clientId: import.meta.env.VITE_AZURE_CLIENT_ID, // From .env.local
      authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID}`,
      redirectUri: "http://localhost:5173", // or your deployed app's URL
    },
    cache: {
      cacheLocation: "sessionStorage", 
      storeAuthStateInCookie: false,
    }
  };
  
  export const loginRequest = {
    // This scope typically references Dataverse. For example:
    scopes: ["https://tstest.crm.dynamics.com/.default"]
    // Or you might have "User.Read" for MS Graph plus your Dataverse scope, e.g.:
    // scopes: ["User.Read", "https://<your-org>.crm.dynamics.com/.default"]
  };