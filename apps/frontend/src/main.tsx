import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from "@clerk/clerk-react";
import App from './App.tsx'
import "./App.css";

// creates the root React component of our app at the #root HTML element
createRoot(document.getElementById('root')!).render(
  // enables development-only checks
  <StrictMode>
    {/* Clerk handles authentication and user context */}
    <ClerkProvider publishableKey = {import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      {/* allows for routing in the application */}
      <BrowserRouter>
        {/* renders the App component */}
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
)