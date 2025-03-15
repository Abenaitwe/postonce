
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X } from "lucide-react";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube, 
  Github,
} from "lucide-react";

interface ConnectedAccount {
  id: string;
  platform: string;
  username: string;
  connected: boolean;
  icon: JSX.Element;
  profileImage?: string;
}

interface PlatformConfig {
  name: string;
  icon: JSX.Element;
  connectLabel: string;
}

const platforms: Record<string, PlatformConfig> = {
  facebook: {
    name: "Facebook",
    icon: <Facebook className="h-6 w-6" />,
    connectLabel: "Connect Facebook",
  },
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
    icon: <Github className="h-6 w-6" />, // Using Github as placeholder for Bluesky
    connectLabel: "Connect Bluesky",
  },
  threads: {
    name: "Threads",
    icon: <Instagram className="h-6 w-6" />, // Using Instagram as placeholder for Threads
    connectLabel: "Connect Threads",
  },
  tiktok: {
    name: "TikTok",
    icon: <Github className="h-6 w-6" />, // Using Github as placeholder for TikTok
    connectLabel: "Connect TikTok",
  },
  pinterest: {
    name: "Pinterest",
    icon: <Github className="h-6 w-6" />, // Using Github as placeholder for Pinterest
    connectLabel: "Connect Pinterest",
  },
};

const ConnectedAccounts = () => {
  const { toast } = useToast();
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([
    {
      id: "1",
      platform: "instagram",
      username: "jackfriks",
      connected: true,
      icon: platforms.instagram.icon,
      profileImage: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: "2",
      platform: "twitter",
      username: "jackfriks",
      connected: true,
      icon: platforms.twitter.icon,
      profileImage: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: "3",
      platform: "twitter",
      username: "curiousquench",
      connected: true,
      icon: platforms.twitter.icon,
      profileImage: "https://i.pravatar.cc/150?img=4",
    },
  ]);

  const handleConnect = (platform: string) => {
    // Simulate connection process
    toast({
      title: "Connecting to " + platforms[platform].name,
      description: "Please wait while we connect your account...",
    });

    // Simulate successful connection after a delay
    setTimeout(() => {
      const newAccount: ConnectedAccount = {
        id: Date.now().toString(),
        platform,
        username: "your_username",
        connected: true,
        icon: platforms[platform].icon,
        profileImage: "https://i.pravatar.cc/150?img=" + Math.floor(Math.random() * 10),
      };
      
      setAccounts([...accounts, newAccount]);
      
      toast({
        title: "Account connected!",
        description: `You've successfully connected your ${platforms[platform].name} account.`,
      });
    }, 1500);
  };

  const handleDisconnect = (accountId: string) => {
    // Simulate disconnection
    toast({
      title: "Disconnecting account",
      description: "Please wait...",
    });

    // Remove the account after a delay
    setTimeout(() => {
      setAccounts(accounts.filter(account => account.id !== accountId));
      
      toast({
        title: "Account disconnected",
        description: "Your account has been disconnected successfully.",
      });
    }, 1000);
  };

  const platformsList = Object.keys(platforms);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
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
        <Button variant="outline" className="border border-gray-300">
          Refresh Instagram
        </Button>
        <Button variant="outline" className="border border-gray-300">
          Refresh Twitter
        </Button>
      </div>
    </div>
  );
};

export default ConnectedAccounts;
