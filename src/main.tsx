
// Add TypeScript declarations for Facebook SDK
declare global {
  interface Window {
    FB: any;
    fbAsyncInit: any; // Change from Function to any to resolve TS2717 error
  }
}

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Facebook SDK is now initialized directly in index.html

createRoot(document.getElementById("root")!).render(<App />);
