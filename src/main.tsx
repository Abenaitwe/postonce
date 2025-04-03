
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Make environment variables available to the Facebook SDK
window.fbAsyncInit = function() {
  FB.init({
    appId      : import.meta.env.VITE_FACEBOOK_CLIENT_ID || '',
    cookie     : true,
    xfbml      : true,
    version    : 'v16.0'
  });
    
  FB.AppEvents.logPageView();   
};

createRoot(document.getElementById("root")!).render(<App />);
