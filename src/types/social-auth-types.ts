
// Define the platforms we support
export type SocialPlatform = 'twitter' | 'facebook' | 'instagram' | 'linkedin' | 'bluesky' | 'threads' | 'tiktok' | 'pinterest' | 'youtube';

// Platform configuration type
export interface PlatformConfig {
  authUrl: string;
  clientId: string;
  scope: string;
  responseType: string;
}

// Type for a connected account
export interface ConnectedAccount {
  id: string;
  platform: string;
  username: string;
  profileImage?: string;
}
