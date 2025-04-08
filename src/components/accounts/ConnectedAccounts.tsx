
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
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
    error,
    connect, 
    disconnect, 
    handleCallback, 
    fetchConnectedAccounts 
  } = useSocialAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [authAlert, setAuthAlert] = useState(false);
  const { isReady, isLoggedIn, profile, login, logout } = useFacebookAuth();
  const [callbackProcessed, setCallbackProcessed] = useState(false);
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);

  // Process callback parameters
  useEffect(() => {
    if (location.pathname === "/accounts/callback" && !callbackProcessed) {
      setCallbackProcessed(true); // Prevent multiple processing
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const state = params.get("state");
      const platform = localStorage.getItem("platform");
      const error = params.get("error");
      const errorReason = params.get("error_reason");
      const errorDescription = params.get("error_description");
      
      // Check for error parameters in the callback
      if (error || errorReason || errorDescription) {
        console.error("OAuth error:", { error, errorReason, errorDescription });
        toast({
          title: "Connection Failed",
          description: errorDescription || errorReason || error || "Authentication failed",
          variant: "destructive"
        });
        
        // Clean up stored data
        localStorage.removeItem("platform");
        localStorage.removeItem("oauth_state");
        
        // Navigate back to accounts page
        navigate("/accounts");
        return;
      }
      
      if (code && platform) {
        console.log(`Callback received for platform ${platform} with code ${code.substring(0, 10)}...`);
        handleCallback(platform as SocialPlatform, code);
        
        localStorage.removeItem("platform");
        localStorage.removeItem("oauth_state");
        
        navigate("/accounts");
      } else {
        console.error("Missing code or platform in callback");
        toast({
          title: "Connection Failed",
          description: "Missing authentication data",
          variant: "destructive"
        });
        
        navigate("/accounts");
      }
    }
  }, [location, handleCallback, navigate, toast, callbackProcessed]);

  // Check session and fetch accounts only once
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
        
        if (data.session) {
          if (!hasAttemptedFetch) {
            setHasAttemptedFetch(true);
            await fetchConnectedAccounts();
          }
          setAuthAlert(false);
        } else {
          setAuthAlert(true);
        }
      } catch (err) {
        console.error("Error checking session:", err);
      }
    };
    
    checkSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        if (session) {
          if (!hasAttemptedFetch) {
            setHasAttemptedFetch(true);
            await fetchConnectedAccounts();
          }
          setAuthAlert(false);
        } else {
          setAuthAlert(true);
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, [hasAttemptedFetch]);

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
        
        {/* Only display persistent errors, not connection errors that may flicker */}
        {error && error !== "Failed to load connected accounts" && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Connection Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
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
            onClick={() => {
              setHasAttemptedFetch(true);
              fetchConnectedAccounts();
            }}
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
