
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.22.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { platform, code, redirectUri } = await req.json();
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Different handling based on platform
    let tokenResponse;
    let profileData;
    let accessToken;
    let refreshToken;
    let expiresAt;
    let username;
    let profileImage;
    
    switch (platform) {
      case 'twitter':
        // Twitter OAuth2 flow
        const twitterClientId = Deno.env.get("TWITTER_CLIENT_ID");
        const twitterClientSecret = Deno.env.get("TWITTER_CLIENT_SECRET");
        
        if (!twitterClientId || !twitterClientSecret) {
          throw new Error("Twitter credentials not configured");
        }
        
        // Exchange code for token
        tokenResponse = await fetch('https://api.twitter.com/2/oauth2/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${btoa(`${twitterClientId}:${twitterClientSecret}`)}`
          },
          body: new URLSearchParams({
            'code': code,
            'grant_type': 'authorization_code',
            'redirect_uri': redirectUri,
            'code_verifier': 'challenge'
          })
        });
        
        const twitterTokenData = await tokenResponse.json();
        accessToken = twitterTokenData.access_token;
        refreshToken = twitterTokenData.refresh_token;
        expiresAt = new Date(Date.now() + twitterTokenData.expires_in * 1000).toISOString();
        
        // Get user profile
        const twitterUserResponse = await fetch('https://api.twitter.com/2/users/me?user.fields=profile_image_url', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        
        profileData = await twitterUserResponse.json();
        username = profileData.data.username;
        profileImage = profileData.data.profile_image_url;
        break;
        
      case 'instagram':
        // Instagram OAuth flow
        const instagramClientId = '1130965872361777';
        const instagramClientSecret = Deno.env.get("INSTAGRAM_CLIENT_SECRET");
        
        if (!instagramClientSecret) {
          throw new Error("Instagram client secret not configured");
        }
        
        console.log("Starting Instagram OAuth flow with code:", code);
        
        // Exchange code for token
        tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
          method: 'POST',
          body: new URLSearchParams({
            'client_id': instagramClientId,
            'client_secret': instagramClientSecret,
            'grant_type': 'authorization_code',
            'redirect_uri': redirectUri,
            'code': code
          })
        });
        
        const instaTokenData = await tokenResponse.json();
        console.log("Instagram token response:", instaTokenData);
        
        if (instaTokenData.error) {
          console.error('Instagram token error:', instaTokenData);
          throw new Error(instaTokenData.error_message || 'Failed to get Instagram token');
        }
        
        accessToken = instaTokenData.access_token;
        const userId = instaTokenData.user_id;
        
        console.log("Instagram access token obtained for user ID:", userId);
        
        // Get user profile with the long-lived token
        const instaUserResponse = await fetch(`https://graph.instagram.com/v13.0/${userId}?fields=username,account_type&access_token=${accessToken}`);
        profileData = await instaUserResponse.json();
        
        console.log("Instagram user profile:", profileData);
        
        if (profileData.error) {
          console.error('Instagram profile error:', profileData);
          throw new Error(profileData.error.message || 'Failed to get Instagram profile');
        }
        
        username = profileData.username;
        // Instagram doesn't provide profile picture in basic API, use default
        profileImage = `https://ui-avatars.com/api/?name=${username}&background=random`;
        break;
        
      // Add more platforms as needed
      
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
    
    // Get the user ID from the request's authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Authorization header missing');
    }
    
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      throw new Error('Failed to authenticate user');
    }
    
    console.log(`Storing ${platform} account for user ${user.id}, username: ${username}`);
    
    // Store the connected account
    const { data, error } = await supabase
      .from('connected_accounts')
      .upsert({
        user_id: user.id,
        platform,
        username,
        access_token: accessToken,
        refresh_token: refreshToken,
        token_expires_at: expiresAt,
        profile_image: profileImage,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id, platform, username'
      });
    
    if (error) {
      console.error('Error storing connected account:', error);
      throw error;
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        platform,
        username,
        profileImage
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error connecting social account:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});
