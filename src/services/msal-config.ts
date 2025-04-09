import { Configuration } from "@azure/msal-browser";

export const msalConfig: Configuration = {
    auth: {
      clientId: "035672f0-12d2-4a6e-a717-b6c98841b4d3", // from Azure AD app registration
      authority: "https://login.microsoftonline.com/practicepro365.com",
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