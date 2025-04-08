
import { PlatformConfig, SocialPlatform } from '@/types/social-auth-types';

// Configuration for each platform
export const platformConfig: Record<SocialPlatform, PlatformConfig> = {
  twitter: {
    authUrl: 'https://twitter.com/i/oauth2/authorize',
    clientId: import.meta.env.VITE_TWITTER_CLIENT_ID || '',
    scope: 'tweet.read users.read offline.access',
    responseType: 'code',
  },
  facebook: {
    authUrl: 'https://www.facebook.com/v13.0/dialog/oauth',
    clientId: '1006135271061769',
    scope: 'public_profile,email',
    responseType: 'code',
  },
  instagram: {
    authUrl: 'https://www.instagram.com/oauth/authorize',
    clientId: '1130965872361777',
    scope: 'user_profile,user_media',
    responseType: 'code',
  },
  linkedin: {
    authUrl: 'https://www.linkedin.com/oauth/v2/authorization',
    clientId: import.meta.env.VITE_LINKEDIN_CLIENT_ID || '',
    scope: 'r_liteprofile r_emailaddress',
    responseType: 'code',
  },
  bluesky: {
    authUrl: '',
    clientId: '',
    scope: '',
    responseType: 'code',
  },
  threads: {
    authUrl: '',
    clientId: '',
    scope: '',
    responseType: 'code',
  },
  tiktok: {
    authUrl: 'https://www.tiktok.com/auth/authorize/',
    clientId: import.meta.env.VITE_TIKTOK_CLIENT_ID || '',
    scope: 'user.info.basic',
    responseType: 'code',
  },
  pinterest: {
    authUrl: 'https://www.pinterest.com/oauth/',
    clientId: import.meta.env.VITE_PINTEREST_CLIENT_ID || '',
    scope: 'boards:read,pins:read',
    responseType: 'code',
  },
  youtube: {
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    clientId: import.meta.env.VITE_YOUTUBE_CLIENT_ID || '',
    scope: 'https://www.googleapis.com/auth/youtube.readonly',
    responseType: 'code',
  },
};
