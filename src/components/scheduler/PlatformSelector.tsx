
import React from "react";
import { CheckIcon } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube, 
  ShoppingBag
} from "lucide-react";

// Define available platforms
const platforms = [
  { id: "facebook", name: "Facebook", icon: <Facebook className="h-5 w-5" /> },
  { id: "instagram", name: "Instagram", icon: <Instagram className="h-5 w-5" /> },
  { id: "twitter", name: "X (Twitter)", icon: <Twitter className="h-5 w-5" /> },
  { id: "linkedin", name: "LinkedIn", icon: <Linkedin className="h-5 w-5" /> },
  { id: "youtube", name: "YouTube", icon: <Youtube className="h-5 w-5" /> },
  // TikTok icon doesn't exist in Lucide, using a similar icon as placeholder
  { id: "tiktok", name: "TikTok", icon: <ShoppingBag className="h-5 w-5" /> },
  // Pinterest icon doesn't exist in Lucide, using a similar icon as placeholder
  { id: "pinterest", name: "Pinterest", icon: <ShoppingBag className="h-5 w-5" /> }
];

interface PlatformSelectorProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const PlatformSelector: React.FC<PlatformSelectorProps> = ({ value, onChange }) => {
  const handleValueChange = (newValue: string[]) => {
    onChange(newValue);
  };

  return (
    <div className="space-y-3">
      <ToggleGroup 
        type="multiple" 
        variant="outline"
        value={value}
        onValueChange={handleValueChange}
        className="flex flex-wrap gap-2"
      >
        {platforms.map((platform) => (
          <ToggleGroupItem 
            key={platform.id} 
            value={platform.id}
            className="flex items-center gap-2 h-auto py-2 px-3 rounded-full data-[state=on]:bg-postbridge-50 data-[state=on]:text-postbridge-600 data-[state=on]:border-postbridge-200"
            aria-label={platform.name}
          >
            {platform.icon}
            <span>{platform.name}</span>
            {value.includes(platform.id) && (
              <CheckIcon className="h-4 w-4 ml-1 text-postbridge-600" />
            )}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};

export default PlatformSelector;
