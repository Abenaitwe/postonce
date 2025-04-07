import React, { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useFacebookAuth } from "@/hooks/use-facebook-auth";

interface FacebookLoginButtonProps {
  size?: "small" | "medium" | "large" | "xlarge";
  layout?: "default" | "rounded" | "pill";
  buttonType?: "login_with" | "continue_with" | "signup_with";
  useCustomTag?: boolean;
  scope?: string;
}

const FacebookLoginButton: React.FC<FacebookLoginButtonProps> = ({ 
  size = "large", 
  layout = "rounded", 
  buttonType = "continue_with",
  useCustomTag = false,
  scope = "public_profile,email,pages_show_list,pages_read_engagement,pages_manage_posts"
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isReady } = useFacebookAuth();
  const { toast } = useToast();

  // Setup a global callback function that the FB login button can call
  useEffect(() => {
    // Define the callback function that Facebook will call after login attempt
    window.checkLoginState = function() {
      if (window.FB) {
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

    // If FB SDK is ready and the container exists, we can render the button
    if (isReady && containerRef.current && window.FB) {
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
    }
  }, [isReady, size, layout, buttonType, useCustomTag]);

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
