
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

// Define the Facebook SDK interface
declare global {
  interface Window {
    FB: any;
    fbAsyncInit: any;
  }
}

export function useFacebookAuth() {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [profile, setProfile] = useState<any>(null);
  const { toast } = useToast();

  // Check if the Facebook SDK is loaded and ready
  useEffect(() => {
    const checkFBSDK = () => {
      if (window.FB) {
        setIsReady(true);
        checkLoginStatus();
      } else {
        // Check again in 100ms
        setTimeout(checkFBSDK, 100);
      }
    };

    checkFBSDK();
  }, []);

  // Check if the user is already logged in
  const checkLoginStatus = () => {
    if (!window.FB) return;

    window.FB.getLoginStatus((response: any) => {
      if (response.status === 'connected') {
        setIsLoggedIn(true);
        fetchUserProfile(response.authResponse.accessToken);
      } else {
        setIsLoggedIn(false);
        setProfile(null);
      }
    });
  };

  // Get user profile information
  const fetchUserProfile = (accessToken: string) => {
    if (!window.FB) return;

    window.FB.api('/me', { fields: 'id,name,email,picture' }, (response: any) => {
      if (response && !response.error) {
        setProfile(response);
      } else {
        console.error('Error fetching Facebook profile:', response.error);
        toast({
          title: 'Error',
          description: 'Failed to fetch Facebook profile information.',
        });
      }
    });
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

    window.FB.login((response: any) => {
      if (response.authResponse) {
        setIsLoggedIn(true);
        fetchUserProfile(response.authResponse.accessToken);
        
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
  };

  // Logout from Facebook
  const logout = () => {
    if (!window.FB) return;

    window.FB.logout(() => {
      setIsLoggedIn(false);
      setProfile(null);
      toast({
        title: 'Logged Out',
        description: 'Successfully logged out from Facebook.',
      });
    });
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
    });
  };

  return {
    isReady,
    isLoggedIn,
    profile,
    login,
    logout,
    postToFacebook,
  };
}
