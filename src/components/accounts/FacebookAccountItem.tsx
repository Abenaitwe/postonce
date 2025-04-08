
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface FacebookAccountItemProps {
  profile: any;
  onDisconnect: () => void;
}

const FacebookAccountItem: React.FC<FacebookAccountItemProps> = ({ profile, onDisconnect }) => {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-8 w-8">
        {profile?.picture?.data?.url && (
          <AvatarImage src={profile.picture.data.url} alt={profile.name} />
        )}
        <AvatarFallback>{profile?.name?.charAt(0) || 'FB'}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-medium text-sm">{profile?.name}</p>
        <Button 
          variant="outline" 
          className="mt-1 h-8 text-xs"
          onClick={onDisconnect}
        >
          Disconnect
        </Button>
      </div>
    </div>
  );
};

export default FacebookAccountItem;
