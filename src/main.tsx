import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App.tsx';
import { Auth0ProviderWithConfig } from './features/auth/services/auth0.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0ProviderWithConfig>
      <App />
    </Auth0ProviderWithConfig>
  </StrictMode>,
)
