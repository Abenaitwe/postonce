
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useSocialAuth } from "@/hooks/use-social-auth";
import { SocialPlatform } from "@/types/social-auth-types";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useFacebookAuth } from "@/hooks/use-facebook-auth";
import AuthAlert from "./AuthAlert";
import PlatformRow from "./PlatformRow";
import { platforms } from "./PlatformConfigs";

const ConnectedAccounts = () => {
  const { toast } = useToast();
  const { 
    accounts, 
    isLoading, 
    connect, 
    disconnect, 
    handleCallback, 
    fetchConnectedAccounts 
  } = useSocialAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [session, setSession] = React.useState(null);
  const [authAlert, setAuthAlert] = React.useState(false);
  const { isReady, isLoggedIn, profile, login, logout } = useFacebookAuth();

  useEffect(() => {
    if (location.pathname === "/accounts/callback") {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const state = params.get("state");
      const platform = localStorage.getItem("platform");
      
      if (code && platform) {
        handleCallback(platform as SocialPlatform, code);
        
        localStorage.removeItem("platform");
        localStorage.removeItem("oauth_state");
        
        navigate("/accounts");
      }
    }
  }, [location, handleCallback, navigate]);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      
      if (data.session) {
        fetchConnectedAccounts();
      } else {
        setAuthAlert(true);
      }
    };
    
    checkSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        if (session) {
          fetchConnectedAccounts();
          setAuthAlert(false);
        } else {
          setAuthAlert(true);
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, [fetchConnectedAccounts]);

  const handleConnect = (platform: string) => {
    if (!session) {
      toast({
        title: "Authentication Required",
        description: "You need to be logged in to connect accounts.",
      });
      return;
    }
    
    if (platform === 'facebook') {
      login();
      return;
    }
    
    localStorage.setItem("platform", platform);
    connect(platform as any);
  };

  const handleDisconnect = (accountId: string) => {
    disconnect(accountId);
  };

  const handleFacebookDisconnect = () => {
    logout();
  };

  const platformsList = Object.keys(platforms);

  if (authAlert) {
    return <AuthAlert />;
  }

  return (
    <div className="space-y-8">
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-6">Connected Accounts</h2>
        <div className="space-y-6">
          {platformsList.map(platform => (
            <PlatformRow
              key={platform}
              platform={platform}
              accounts={accounts}
              isLoading={isLoading}
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
              isFacebook={platform === 'facebook'}
              isReady={isReady}
              isLoggedIn={isLoggedIn}
              facebookProfile={profile}
              onFacebookDisconnect={handleFacebookDisconnect}
            />
          ))}
        </div>
        
        <div className="flex justify-start gap-4 mt-8">
          <Button 
            variant="outline" 
            className="border border-gray-300"
            onClick={() => fetchConnectedAccounts()}
            disabled={isLoading}
          >
            Refresh Accounts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConnectedAccounts;
