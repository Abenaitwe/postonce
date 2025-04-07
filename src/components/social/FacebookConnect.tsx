import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Facebook, LogOut } from "lucide-react";
import { useFacebookAuth } from "@/hooks/use-facebook-auth";
import FacebookLoginButton from "./FacebookLoginButton";

const FacebookConnect: React.FC = () => {
  const { isReady, isLoggedIn, profile, logout, login } = useFacebookAuth();

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
            className="bg-blue-600 hover:bg-blue-700 mb-4"
            onClick={login}
          >
            <Facebook className="mr-2 h-5 w-5" />
            Connect with Facebook (Custom Button)
          </Button>
          
          <div className="mt-6">
            <p className="text-sm text-gray-500 mb-2">Facebook's official login options:</p>
            
            <div className="space-y-3">
              <div className="p-3 border border-gray-200 rounded-md">
                <p className="text-xs text-gray-500 mb-2">Standard XFBML Button:</p>
                <FacebookLoginButton 
                  size="large"
                  layout="rounded"
                  buttonType="continue_with"
                />
              </div>
              
              <div className="p-3 border border-gray-200 rounded-md">
                <p className="text-xs text-gray-500 mb-2">Custom Tag with onLogin Callback:</p>
                <FacebookLoginButton 
                  useCustomTag={true}
                  scope="public_profile,email,pages_show_list,pages_read_engagement,pages_manage_posts"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacebookConnect;
