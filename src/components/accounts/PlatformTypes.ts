
import { SocialPlatform } from "@/types/social-auth-types";

export interface PlatformConfig {
  name: string;
  icon: JSX.Element;
  connectLabel: string;
  buttonClass?: string;
}

export interface ConnectedAccountItemProps {
  account: {
    id: string;
    platform: string;
    username: string;
    profileImage?: string;
  };
  onDisconnect: (accountId: string) => void;
  isLoading: boolean;
}
