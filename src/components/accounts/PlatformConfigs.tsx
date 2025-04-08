
import React from "react";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube, 
  Github
} from "lucide-react";
import { PlatformConfig } from "./PlatformTypes";

// Platform configuration
export const platforms: Record<string, PlatformConfig> = {
  facebook: {
    name: "Facebook",
    icon: <Facebook className="h-6 w-6" />,
    connectLabel: "Connect Facebook",
    buttonClass: "bg-[#1877F2] text-white hover:bg-[#166FE5]"
  },
  instagram: {
    name: "Instagram",
    icon: <Instagram className="h-6 w-6" />,
    connectLabel: "Connect Instagram",
    buttonClass: "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white hover:opacity-90"
  },
  twitter: {
    name: "Twitter",
    icon: <Twitter className="h-6 w-6" />,
    connectLabel: "Connect Twitter",
    buttonClass: "bg-blue-500 text-white hover:bg-blue-600"
  },
  linkedin: {
    name: "LinkedIn",
    icon: <Linkedin className="h-6 w-6" />,
    connectLabel: "Connect LinkedIn",
    buttonClass: "bg-[#0077B5] text-white hover:bg-[#00689B]"
  },
  youtube: {
    name: "Youtube",
    icon: <Youtube className="h-6 w-6" />,
    connectLabel: "Connect Youtube",
    buttonClass: "bg-red-500 text-white hover:bg-red-600"
  },
  bluesky: {
    name: "Bluesky",
    icon: <Github className="h-6 w-6" />,
    connectLabel: "Connect Bluesky",
    buttonClass: "bg-[#1877F2] text-white hover:bg-[#166FE5]"
  },
  threads: {
    name: "Threads",
    icon: <Instagram className="h-6 w-6" />,
    connectLabel: "Connect Threads",
    buttonClass: "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white hover:opacity-90"
  },
  tiktok: {
    name: "TikTok",
    icon: <Github className="h-6 w-6" />,
    connectLabel: "Connect TikTok",
    buttonClass: "bg-[#1877F2] text-white hover:bg-[#166FE5]"
  },
  pinterest: {
    name: "Pinterest",
    icon: <Github className="h-6 w-6" />,
    connectLabel: "Connect Pinterest",
    buttonClass: "bg-[#1877F2] text-white hover:bg-[#166FE5]"
  },
};
