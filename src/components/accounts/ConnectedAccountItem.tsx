
import React from "react";
import { X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ConnectedAccountItemProps } from "./PlatformTypes";

const ConnectedAccountItem: React.FC<ConnectedAccountItemProps> = ({ 
  account, 
  onDisconnect, 
  isLoading 
}) => {
  return (
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
        onClick={() => onDisconnect(account.id)}
        className="ml-1 text-gray-500 hover:text-red-500"
        disabled={isLoading}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default ConnectedAccountItem;
