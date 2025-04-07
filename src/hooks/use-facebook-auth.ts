
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

// Define the Facebook SDK interface
declare global {
  interface Window {
    FB: any;
    fbAsyncInit: any;
    checkLoginState: () => void;
  }
}

// Define the Facebook auth response type
interface FacebookAuthResponse {
  accessToken: string;
  expiresIn: string;
  signedRequest: string;
  userID: string;
}

export function useFacebookAuth() {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [profile, setProfile] = useState<any>(null);
  const [authResponse, setAuthResponse] = useState<FacebookAuthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Check if the Facebook SDK is loaded and ready
  useEffect(() => {
    // Reset error state when checking
    setError(null);
    
    const checkFBSDK = () => {
      try {
        if (window.FB) {
          setIsReady(true);
          
          // Check login status when SDK is ready
          window.FB.getLoginStatus(function(response: any) {
            statusChangeCallback(response);
          });
        } else {
          // Check again in 100ms
          setTimeout(checkFBSDK, 100);
        }
      } catch (err: any) {
        console.error("Facebook SDK error:", err);
        setError(err.message || "Failed to initialize Facebook SDK");
        setIsReady(false);
      }
    };

    checkFBSDK();
  }, []);

  // Handle status changes from Facebook login
  const statusChangeCallback = (response: any) => {
    if (response.status === 'connected') {
      // User is logged in and has authorized the app
      setIsLoggedIn(true);
      // Store the auth response
      setAuthResponse(response.authResponse);
      fetchUserProfile(response.authResponse.accessToken);
    } else {
      // User is either not logged in or has not authorized the app
      setIsLoggedIn(false);
      setProfile(null);
      setAuthResponse(null);
    }
  };

  // Get user profile information
  const fetchUserProfile = (accessToken: string) => {
    if (!window.FB) return;

    try {
      window.FB.api('/me', { fields: 'id,name,email,picture' }, (response: any) => {
        if (response && !response.error) {
          setProfile(response);
        } else {
          console.error('Error fetching Facebook profile:', response?.error);
          toast({
            title: 'Error',
            description: 'Failed to fetch Facebook profile information.',
          });
        }
      });
    } catch (err) {
      console.error("Error in fetchUserProfile:", err);
    }
  };

  // Login with Facebook
  const login = () => {
    if (!window.FB) {
      toast({
        title: 'SDK Not Loaded',
        description: 'Facebook SDK is not loaded yet. Please try again in a moment.',
      });
      return;
    }

    try {
      window.FB.login((response: any) => {
        if (response.authResponse) {
          statusChangeCallback(response);
          
          // Return the auth response for potential token storage
          return response.authResponse;
        } else {
          console.log('User cancelled login or did not fully authorize.');
          toast({
            title: 'Login Cancelled',
            description: 'Facebook login was cancelled or not authorized.',
          });
          return null;
        }
      }, { scope: 'email,public_profile,pages_show_list,pages_read_engagement,pages_manage_posts' });
    } catch (err: any) {
      console.error("Facebook login error:", err);
      toast({
        variant: "destructive",
        title: "Facebook Login Error",
        description: "There was an error initiating Facebook login. Your domain may not be authorized in the Facebook App settings.",
      });
    }
  };

  // Logout from Facebook
  const logout = () => {
    if (!window.FB) return;

    try {
      window.FB.logout(() => {
        setIsLoggedIn(false);
        setProfile(null);
        setAuthResponse(null);
        toast({
          title: 'Logged Out',
          description: 'Successfully logged out from Facebook.',
        });
      });
    } catch (err) {
      console.error("Facebook logout error:", err);
      toast({
        variant: "destructive",
        title: "Logout Error",
        description: "Error logging out from Facebook.",
      });
    }
  };

  // Post to Facebook
  const postToFacebook = async (message: string, link?: string) => {
    if (!window.FB || !isLoggedIn) {
      toast({
        title: 'Not Logged In',
        description: 'You need to login to Facebook first.',
      });
      return false;
    }

    return new Promise((resolve, reject) => {
      const postData: any = { message };
      if (link) postData.link = link;

      try {
        window.FB.api('/me/feed', 'POST', postData, (response: any) => {
          if (response && !response.error) {
            toast({
              title: 'Post Successful',
              description: 'Your message was posted to Facebook successfully.',
            });
            resolve(true);
          } else {
            console.error('Error posting to Facebook:', response?.error);
            toast({
              title: 'Post Failed',
              description: response?.error?.message || 'Failed to post to Facebook.',
            });
            reject(response?.error);
          }
        });
      } catch (err) {
        console.error("Error in postToFacebook:", err);
        reject(err);
      }
    });
  };

  return {
    isReady,
    isLoggedIn,
    profile,
    authResponse,
    error,
    login,
    logout,
    postToFacebook,
  };
}
