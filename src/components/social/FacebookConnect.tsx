
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Facebook, LogOut } from "lucide-react";
import { useFacebookAuth } from "@/hooks/use-facebook-auth";

const FacebookConnect: React.FC = () => {
  const { isReady, isLoggedIn, profile, login, logout } = useFacebookAuth();

  return (
    <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Facebook className="h-6 w-6 text-blue-600" />
        Facebook Direct Integration
      </h2>
      
      {!isReady ? (
        <p className="text-gray-500">Loading Facebook SDK...</p>
      ) : isLoggedIn ? (
        <div className="flex flex-col gap-4">
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
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2" 
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            Disconnect Facebook
          </Button>
        </div>
      ) : (
        <div>
          <p className="mb-4 text-gray-600">
            Connect your Facebook account to post directly from Post Once.
          </p>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={login}
          >
            <Facebook className="mr-2 h-5 w-5" />
            Connect with Facebook
          </Button>
        </div>
      )}
    </div>
  );
};

export default FacebookConnect;
