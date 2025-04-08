
import React, { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useFacebookAuth } from "@/hooks/use-facebook-auth";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FacebookLoginButtonProps {
  size?: "small" | "medium" | "large" | "xlarge";
  layout?: "default" | "rounded" | "pill";
  buttonType?: "login_with" | "continue_with" | "signup_with";
  useCustomTag?: boolean;
  scope?: string;
  appId?: string;
}

const FacebookLoginButton: React.FC<FacebookLoginButtonProps> = ({ 
  size = "large", 
  layout = "rounded", 
  buttonType = "continue_with",
  useCustomTag = false,
  scope = "public_profile,email,pages_show_list,pages_read_engagement,pages_manage_posts",
  appId = "1006135271061769"
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isReady, isLoggedIn, login, logout } = useFacebookAuth();
  const { toast } = useToast();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Setup a global callback function that the FB login button can call
  useEffect(() => {
    // Define the callback function that Facebook will call after login attempt
    window.checkLoginState = function() {
      if (window.FB) {
        try {
          window.FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
              toast({
                title: "Success",
                description: "Successfully connected to Facebook!",
              });
              
              // Refresh the page to update state or handle in your app logic
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            } else {
              toast({
                variant: "destructive",
                title: "Connection Failed",
                description: "Could not connect to Facebook. Please try again.",
              });
            }
          });
        } catch (error) {
          console.error("Facebook SDK error:", error);
          setErrorMessage("Could not initialize Facebook SDK. Please check your app configuration.");
        }
      }
    };

    return () => {
      // Clean up the global function when component unmounts
      delete window.checkLoginState;
    };
  }, [toast]);

  useEffect(() => {
    // If using the custom tag approach, we don't need to do anything else
    if (useCustomTag) return;

    // Reset error state when trying to initialize
    setErrorMessage(null);

    // If FB SDK is ready and the container exists, we can render the button
    if (isReady && containerRef.current && window.FB) {
      try {
        // Clear container first
        containerRef.current.innerHTML = '';
        
        // Create a new FB login button element
        const fbButtonContainer = document.createElement('div');
        fbButtonContainer.className = 'fb-login-button';
        fbButtonContainer.dataset.width = '';
        fbButtonContainer.dataset.size = size;
        fbButtonContainer.dataset.buttonType = buttonType;
        fbButtonContainer.dataset.layout = layout;
        fbButtonContainer.dataset.autoLogoutLink = 'false';
        fbButtonContainer.dataset.useContinueAs = 'false';
        
        // Append to our container
        containerRef.current.appendChild(fbButtonContainer);
        
        // Parse the newly added element
        if (window.FB.XFBML) {
          window.FB.XFBML.parse(containerRef.current);
        }
      } catch (error) {
        console.error("Facebook SDK initialization error:", error);
        setErrorMessage("Could not initialize Facebook SDK. Your domain may not be authorized in the Facebook App settings.");
      }
    }
  }, [isReady, size, layout, buttonType, useCustomTag]);

  // Display an error message if there's an issue with the Facebook SDK
  if (errorMessage) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {errorMessage} If you see "JSSDK Unknown Host domain" error, please add your domain to the list of authorized domains in your Facebook App settings.
        </AlertDescription>
      </Alert>
    );
  }

  // Render the custom fb:login-button tag if useCustomTag is true
  if (useCustomTag) {
    return (
      <div className="fb-custom-button min-h-[40px]">
        {!isReady ? (
          <div className="text-gray-500 text-sm">Loading Facebook button...</div>
        ) : (
          <div dangerouslySetInnerHTML={{
            __html: `<fb:login-button 
              scope="${scope}"
              onlogin="checkLoginState();">
            </fb:login-button>`
          }} />
        )}
      </div>
    );
  }

  // Otherwise render the container for the dynamically created button
  return (
    <div ref={containerRef} className="fb-login-container min-h-[40px]">
      {!isReady && <div className="text-gray-500 text-sm">Loading Facebook button...</div>}
    </div>
  );
};

// Add the checkLoginState to the window object type
declare global {
  interface Window {
    FB: any;
    fbAsyncInit: any;
    checkLoginState: () => void;
  }
}

export default FacebookLoginButton;
