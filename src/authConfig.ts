export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
    authority: `https://login.microsoft.com/${import.meta.env.VITE_AZURE_TENANT_ID}`
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: true
  }
}

export const authRequest = {
  scopes: []
}
