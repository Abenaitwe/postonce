import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Define the platforms we support
type SocialPlatform = 'twitter' | 'facebook' | 'instagram' | 'linkedin' | 'bluesky' | 'threads' | 'tiktok' | 'pinterest' | 'youtube';

// Configuration for each platform
const platformConfig: Record<SocialPlatform, {
  authUrl: string;
  clientId: string;
  scope: string;
  responseType: string;
}> = {
  twitter: {
    authUrl: 'https://twitter.com/i/oauth2/authorize',
    clientId: import.meta.env.VITE_TWITTER_CLIENT_ID || '',
    scope: 'tweet.read users.read offline.access',
    responseType: 'code',
  },
  facebook: {
    authUrl: 'https://www.facebook.com/v13.0/dialog/oauth',
    clientId: '1006135271061769',
    scope: 'public_profile,email',
    responseType: 'code',
  },
  instagram: {
    authUrl: 'https://www.instagram.com/oauth/authorize',
    clientId: '1130965872361777',
    scope: 'instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments,instagram_business_content_publish,instagram_business_manage_insights',
    responseType: 'code',
  },
  linkedin: {
    authUrl: 'https://www.linkedin.com/oauth/v2/authorization',
    clientId: import.meta.env.VITE_LINKEDIN_CLIENT_ID || '',
    scope: 'r_liteprofile r_emailaddress',
    responseType: 'code',
  },
  bluesky: {
    authUrl: '',
    clientId: '',
    scope: '',
    responseType: 'code',
  },
  threads: {
    authUrl: '',
    clientId: '',
    scope: '',
    responseType: 'code',
  },
  tiktok: {
    authUrl: 'https://www.tiktok.com/auth/authorize/',
    clientId: import.meta.env.VITE_TIKTOK_CLIENT_ID || '',
    scope: 'user.info.basic',
    responseType: 'code',
  },
  pinterest: {
    authUrl: 'https://www.pinterest.com/oauth/',
    clientId: import.meta.env.VITE_PINTEREST_CLIENT_ID || '',
    scope: 'boards:read,pins:read',
    responseType: 'code',
  },
  youtube: {
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    clientId: import.meta.env.VITE_YOUTUBE_CLIENT_ID || '',
    scope: 'https://www.googleapis.com/auth/youtube.readonly',
    responseType: 'code',
  },
};

// Generate a random string for state parameter
const generateRandomString = (length: number) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// Type for a connected account
export interface ConnectedAccount {
  id: string;
  platform: string;
  username: string;
  profileImage?: string;
}

export function useSocialAuth() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([]);
  const { toast } = useToast();

  // Initialize - fetch user's connected accounts
  const fetchConnectedAccounts = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('connected_accounts')
        .select('id, platform, username, profile_image');
      
      if (error) throw error;
      
      // Transform data to match ConnectedAccount interface
      const connectedAccounts = data.map(account => ({
        id: account.id,
        platform: account.platform,
        username: account.username,
        profileImage: account.profile_image,
      }));
      
      setAccounts(connectedAccounts);
    } catch (error) {
      console.error('Error fetching connected accounts', error);
      toast({
        title: 'Error',
        description: 'Failed to load your connected accounts.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Connect to a social platform
  const connect = async (platform: SocialPlatform) => {
    try {
      // First check if the platform is properly configured
      const config = platformConfig[platform];
      if (!config.clientId) {
        toast({
          title: 'Configuration Missing',
          description: `${platform} integration is not yet configured.`,
        });
        return;
      }

      // Generate state and store it for verification
      const state = generateRandomString(16);
      localStorage.setItem('oauth_state', state);
      
      // Create redirect URI, ensuring it's an absolute URL
      const redirectUri = window.location.origin + '/accounts/callback';
      
      // Build the URL
      const url = new URL(config.authUrl);
      url.searchParams.append('client_id', config.clientId);
      url.searchParams.append('redirect_uri', redirectUri);
      url.searchParams.append('state', state);
      url.searchParams.append('scope', config.scope);
      url.searchParams.append('response_type', config.responseType);
      
      // For Twitter, add PKCE challenge
      if (platform === 'twitter') {
        // In a real implementation, you would generate a proper code challenge
        // For simplicity, we're using a fixed value here
        url.searchParams.append('code_challenge', 'challenge');
        url.searchParams.append('code_challenge_method', 'plain');
      }
      
      // For Instagram, disable Facebook login and force authentication
      if (platform === 'instagram') {
        url.searchParams.append('enable_fb_login', '0');
        url.searchParams.append('force_authentication', '1');
      }
      
      // Redirect to authorization URL
      window.location.href = url.toString();
    } catch (error) {
      console.error(`Error connecting to ${platform}`, error);
      toast({
        title: 'Connection Failed',
        description: `Failed to connect to ${platform}.`,
      });
    }
  };

  // Handle OAuth callback
  const handleCallback = async (platform: SocialPlatform, code: string) => {
    try {
      setIsLoading(true);
      
      // Verify state parameter (not implemented here for brevity)
      
      // Exchange code for token via our edge function
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session) {
        throw new Error('You must be logged in to connect accounts');
      }
      
      const response = await supabase.functions.invoke('social-auth', {
        body: {
          platform,
          code,
          redirectUri: window.location.origin + '/accounts/callback'
        },
        headers: {
          Authorization: `Bearer ${sessionData.session.access_token}`
        }
      });
      
      if (!response.data.success) {
        throw new Error(response.data.error || `Failed to connect ${platform} account`);
      }
      
      // Show success message
      toast({
        title: 'Account Connected',
        description: `Successfully connected ${platform} account: ${response.data.username}`,
      });
      
      // Refresh the accounts list
      await fetchConnectedAccounts();
    } catch (error) {
      console.error('Error handling OAuth callback', error);
      toast({
        title: 'Connection Failed',
        description: error.message || `Failed to complete ${platform} connection.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Disconnect a social account
  const disconnect = async (accountId: string) => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase
        .from('connected_accounts')
        .delete()
        .eq('id', accountId);
      
      if (error) throw error;
      
      // Remove from state
      setAccounts(accounts.filter(account => account.id !== accountId));
      
      toast({
        title: 'Account Disconnected',
        description: 'Your account has been disconnected successfully.',
      });
    } catch (error) {
      console.error('Error disconnecting account', error);
      toast({
        title: 'Disconnection Failed',
        description: 'Failed to disconnect the account.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    accounts,
    connect,
    disconnect,
    handleCallback,
    fetchConnectedAccounts,
  };
}
