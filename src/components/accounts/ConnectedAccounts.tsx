
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X, AlertCircle } from "lucide-react";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube, 
  Github,
} from "lucide-react";
import { useSocialAuth } from "@/hooks/use-social-auth";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { useFacebookAuth } from "@/hooks/use-facebook-auth";

// Platform configuration
interface PlatformConfig {
  name: string;
  icon: JSX.Element;
  connectLabel: string;
}

const platforms: Record<string, PlatformConfig> = {
  instagram: {
    name: "Instagram",
    icon: <Instagram className="h-6 w-6" />,
    connectLabel: "Connect Instagram",
  },
  twitter: {
    name: "Twitter",
    icon: <Twitter className="h-6 w-6" />,
    connectLabel: "Connect Twitter",
  },
  linkedin: {
    name: "LinkedIn",
    icon: <Linkedin className="h-6 w-6" />,
    connectLabel: "Connect LinkedIn",
  },
  youtube: {
    name: "Youtube",
    icon: <Youtube className="h-6 w-6" />,
    connectLabel: "Connect Youtube",
  },
  bluesky: {
    name: "Bluesky",
    icon: <Github className="h-6 w-6" />,
    connectLabel: "Connect Bluesky",
  },
  threads: {
    name: "Threads",
    icon: <Instagram className="h-6 w-6" />,
    connectLabel: "Connect Threads",
  },
  tiktok: {
    name: "TikTok",
    icon: <Github className="h-6 w-6" />,
    connectLabel: "Connect TikTok",
  },
  pinterest: {
    name: "Pinterest",
    icon: <Github className="h-6 w-6" />,
    connectLabel: "Connect Pinterest",
  },
};

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

  // Check for OAuth callback
  useEffect(() => {
    if (location.pathname === "/accounts/callback") {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const state = params.get("state");
      const platform = localStorage.getItem("platform");
      
      if (code && platform) {
        // Process the OAuth callback
        handleCallback(platform as any, code);
        
        // Clean up storage
        localStorage.removeItem("platform");
        localStorage.removeItem("oauth_state");
        
        // Redirect back to the accounts page
        navigate("/accounts");
      }
    }
  }, [location]);

  // Check for user session and load accounts
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
    
    // Subscribe to auth changes
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
  }, []);

  const handleConnect = (platform: string) => {
    if (!session) {
      toast({
        title: "Authentication Required",
        description: "You need to be logged in to connect accounts.",
      });
      return;
    }
    
    // Store the platform in localStorage for callback handling
    localStorage.setItem("platform", platform);
    connect(platform as any);
  };

  const handleDisconnect = (accountId: string) => {
    disconnect(accountId);
  };

  const platformsList = Object.keys(platforms);

  if (authAlert) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Authentication Required</AlertTitle>
        <AlertDescription>
          You need to be logged in to connect and manage social media accounts.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-8">
      {/* Facebook Integration */}
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 mr-4 flex items-center justify-center">
            <Facebook className="h-6 w-6" />
          </div>
          
          <div className="flex-1">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  {profile?.picture?.data?.url && (
                    <AvatarImage src={profile.picture.data.url} alt={profile.name} />
                  )}
                  <AvatarFallback>{profile?.name?.charAt(0) || 'FB'}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{profile?.name}</p>
                  <p className="text-sm text-gray-500">{profile?.email}</p>
                  <Button 
                    variant="outline" 
                    className="mt-2"
                    onClick={logout}
                  >
                    Disconnect Facebook
                  </Button>
                </div>
              </div>
            ) : (
              <Button 
                className="bg-[#1877F2] text-white hover:bg-[#166FE5] px-4 py-2 rounded w-60"
                onClick={login}
                disabled={!isReady}
              >
                <Facebook className="mr-2 h-5 w-5" />
                Connect Facebook
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Regular OAuth Platform Connections */}
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-6">OAuth Platform Connections</h2>
        <div className="space-y-6">
          {platformsList.map(platform => (
            <div key={platform} className="flex items-center">
              <div className="w-10 h-10 mr-4 flex items-center justify-center">
                {platforms[platform].icon}
              </div>
              
              <div className="flex-1">
                <Button 
                  variant="outline" 
                  className="bg-gray-800 text-white hover:bg-gray-700 px-4 py-2 rounded w-60"
                  onClick={() => handleConnect(platform)}
                  disabled={isLoading}
                >
                  {platforms[platform].connectLabel}
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 ml-4">
                {accounts
                  .filter(account => account.platform === platform)
                  .map(account => (
                    <div 
                      key={account.id}
                      className="flex items-center gap-2 bg-gray-100 rounded-full pl-1 pr-2 py-1"
                    >
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={account.profileImage} />
                        <AvatarFallback>
                          {account.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{account.username}</span>
                      <button 
                        onClick={() => handleDisconnect(account.id)}
                        className="ml-1 text-gray-500 hover:text-red-500"
                        disabled={isLoading}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
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
