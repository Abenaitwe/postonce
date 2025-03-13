
import React from "react";
import { Link } from "@/components/ui/link";
import { Globe, Share2, Users, Zap, PenTool, Smartphone } from "lucide-react";

const features = [
  {
    icon: <Globe className="h-10 w-10 text-postbridge-600" />,
    title: "One Link For Everything",
    description: "Share your Post-Bridge link on Instagram, TikTok, Twitter or anywhere else to send followers to all your content."
  },
  {
    icon: <Share2 className="h-10 w-10 text-postbridge-600" />,
    title: "Easy Sharing",
    description: "Simply share your custom Post-Bridge URL anywhere you want to connect with your audience."
  },
  {
    icon: <PenTool className="h-10 w-10 text-postbridge-600" />,
    title: "Fully Customizable",
    description: "Personalize your page with custom themes, fonts, and button styles to match your brand."
  },
  {
    icon: <Zap className="h-10 w-10 text-postbridge-600" />,
    title: "Fast & Responsive",
    description: "Optimized for all devices and built for speed - your audience will love the experience."
  },
  {
    icon: <Users className="h-10 w-10 text-postbridge-600" />,
    title: "Grow Your Audience",
    description: "Connect all your social networks in one place to maximize your reach and engagement."
  },
  {
    icon: <Smartphone className="h-10 w-10 text-postbridge-600" />,
    title: "Mobile Optimized",
    description: "Perfect viewing experience across all devices, especially mobile where most social traffic comes from."
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="mb-4 font-bold text-gray-900">All the features you need</h2>
          <p className="text-xl text-gray-600">
            Everything you need to connect your audience across different platforms.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="mb-5">{feature.icon}</div>
              <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
