
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

// Make environment variables available to the Facebook SDK
window.fbAsyncInit = function() {
  window.FB.init({
    appId      : '990325533241007',
    cookie     : true,
    xfbml      : true,
    version    : 'v16.0'
  });
    
  window.FB.AppEvents.logPageView();   
};

createRoot(document.getElementById("root")!).render(<App />);
