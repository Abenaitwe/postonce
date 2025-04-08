
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { SocialPlatform, ConnectedAccount } from '@/types/social-auth-types';
import { platformConfig } from '@/config/platform-config';
import { generateRandomString } from '@/utils/social-auth-utils';

export function useSocialAuth() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Initialize - fetch user's connected accounts
  const fetchConnectedAccounts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
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
      setIsFirstLoad(false);
    } catch (error) {
      console.error('Error fetching connected accounts', error);
      
      // Only show error toast on first load or explicit refresh actions
      if (isFirstLoad) {
        setError('Failed to load connected accounts');
        toast({
          title: 'Error',
          description: 'Failed to load your connected accounts. Please try again later.',
        });
        setIsFirstLoad(false);
      }
    } finally {
      setIsLoading(false);
    }
  }, [toast, isFirstLoad]);

  // Connect to a social platform
  const connect = async (platform: SocialPlatform) => {
    try {
      setError(null);
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
      console.log(`Connecting to ${platform} with redirect URI: ${redirectUri}`);
      
      // Build the URL
      const url = new URL(config.authUrl);
      url.searchParams.append('client_id', config.clientId);
      url.searchParams.append('redirect_uri', redirectUri);
      url.searchParams.append('state', state);
      url.searchParams.append('scope', config.scope);
      url.searchParams.append('response_type', config.responseType);
      
      // Special handling for Instagram
      if (platform === 'instagram') {
        // These parameters are important for Instagram
        url.searchParams.delete('enable_fb_login'); // Don't include this parameter
        url.searchParams.delete('force_authentication'); // Don't include this parameter
      }
      
      // Redirect to authorization URL
      console.log(`Redirecting to ${platform} auth URL:`, url.toString());
      window.location.href = url.toString();
    } catch (error) {
      console.error(`Error connecting to ${platform}`, error);
      setError(`Failed to connect to ${platform}`);
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
      setError(null);
      console.log(`Processing ${platform} callback with code: ${code.substring(0, 10)}...`);
      
      // Verify state parameter (not implemented here for brevity)
      
      // Exchange code for token via our edge function
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session) {
        throw new Error('You must be logged in to connect accounts');
      }
      
      const redirectUri = window.location.origin + '/accounts/callback';
      console.log(`Using redirect URI for edge function: ${redirectUri}`);
      
      const response = await supabase.functions.invoke('social-auth', {
        body: {
          platform,
          code,
          redirectUri
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
      setError(error.message || `Failed to complete ${platform} connection`);
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
      setError(null);
      
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
      setError('Failed to disconnect account');
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
    error,
    connect,
    disconnect,
    handleCallback,
    fetchConnectedAccounts,
  };
}
