
import React from "react";
import { Button } from "@/components/ui/button";
import { ConnectedAccount } from "@/types/social-auth-types";
import ConnectedAccountItem from "./ConnectedAccountItem";
import FacebookAccountItem from "./FacebookAccountItem";
import { platforms } from "./PlatformConfigs";

interface PlatformRowProps {
  platform: string;
  accounts: ConnectedAccount[];
  isLoading: boolean;
  onConnect: (platform: string) => void;
  onDisconnect: (accountId: string) => void;
  // Facebook specific props
  isFacebook?: boolean;
  isReady?: boolean;
  isLoggedIn?: boolean;
  facebookProfile?: any;
  onFacebookDisconnect?: () => void;
}

const PlatformRow: React.FC<PlatformRowProps> = ({
  platform,
  accounts,
  isLoading,
  onConnect,
  onDisconnect,
  isFacebook = false,
  isReady = true,
  isLoggedIn = false,
  facebookProfile,
  onFacebookDisconnect
}) => {
  const platformConfig = platforms[platform];
  const isConnected = isFacebook ? isLoggedIn : accounts.some(account => account.platform === platform);
  
  const filteredAccounts = accounts.filter(account => account.platform === platform);
  
  return (
    <div className="flex items-center">
      <div className="w-10 h-10 mr-4 flex items-center justify-center">
        {platformConfig.icon}
      </div>
      
      <div className="flex-1">
        {(isFacebook && isLoggedIn) ? (
          facebookProfile && onFacebookDisconnect && 
          <FacebookAccountItem 
            profile={facebookProfile} 
            onDisconnect={onFacebookDisconnect} 
          />
        ) : (
          <Button 
            variant={isFacebook || platform === 'instagram' ? "default" : "outline"}
            className={platformConfig.buttonClass ? 
              `${platformConfig.buttonClass} px-4 py-2 rounded w-60` : 
              "bg-gray-800 text-white hover:bg-gray-700 px-4 py-2 rounded w-60"}
            onClick={() => onConnect(platform)}
            disabled={isLoading || (isFacebook && !isReady)}
          >
            {platformConfig.connectLabel}
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2 ml-4">
        {!isFacebook && filteredAccounts.map(account => (
          <ConnectedAccountItem
            key={account.id}
            account={account}
            onDisconnect={onDisconnect}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
};

export default PlatformRow;
