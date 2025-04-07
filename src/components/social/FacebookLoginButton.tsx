
import React, { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useFacebookAuth } from "@/hooks/use-facebook-auth";

interface FacebookLoginButtonProps {
  size?: "small" | "medium" | "large" | "xlarge";
  layout?: "default" | "rounded" | "pill";
  buttonType?: "login_with" | "continue_with" | "signup_with";
}

const FacebookLoginButton: React.FC<FacebookLoginButtonProps> = ({ 
  size = "large", 
  layout = "rounded", 
  buttonType = "continue_with" 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isReady } = useFacebookAuth();
  const { toast } = useToast();

  useEffect(() => {
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
  }, [isReady, size, layout, buttonType]);

  return (
    <div ref={containerRef} className="fb-login-container min-h-[40px]">
      {!isReady && <div className="text-gray-500 text-sm">Loading Facebook button...</div>}
    </div>
  );
};

export default FacebookLoginButton;
