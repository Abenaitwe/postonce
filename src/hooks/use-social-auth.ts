
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { SocialPlatform, ConnectedAccount } from '@/types/social-auth-types';
import { platformConfig } from '@/config/platform-config';
import { generateRandomString } from '@/utils/social-auth-utils';

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
      localStorage.setItem('platform', platform);
      
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
      console.log(`Redirecting to ${platform} auth URL:`, url.toString());
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
      console.log(`Processing ${platform} callback with code`, code);
      
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
      
      console.log(`${platform} edge function response:`, response);
      
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
