
import React from "react";
import { Link } from "@/components/ui/link";
import { Globe, Share2, Users, Zap, PenTool, Smartphone, Calendar, Clock } from "lucide-react";

const features = [
  {
    icon: <Calendar className="h-10 w-10 text-postbridge-600" />,
    title: "Schedule Posts Across Platforms",
    description: "Create once, share everywhere. Schedule posts to go live on multiple social networks simultaneously."
  },
  {
    icon: <Clock className="h-10 w-10 text-postbridge-600" />,
    title: "Perfect Timing",
    description: "Schedule your content for the optimal time when your audience is most active across each platform."
  },
  {
    icon: <Share2 className="h-10 w-10 text-postbridge-600" />,
    title: "Easy Sharing",
    description: "Simply create your content once and Post-Bridge handles distributing it across Facebook, Instagram, X, LinkedIn, and more."
  },
  {
    icon: <PenTool className="h-10 w-10 text-postbridge-600" />,
    title: "Fully Customizable",
    description: "Personalize your posts with custom text, images, and videos optimized for each platform."
  },
  {
    icon: <Zap className="h-10 w-10 text-postbridge-600" />,
    title: "Fast & Efficient",
    description: "Save hours every week by managing all your social media accounts from one dashboard."
  },
  {
    icon: <Smartphone className="h-10 w-10 text-postbridge-600" />,
    title: "Mobile Optimized",
    description: "Schedule posts on the go with our responsive design that works on desktop, tablet, and mobile."
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="mb-4 font-bold text-gray-900">All the features you need</h2>
          <p className="text-xl text-gray-600">
            Everything you need to manage and schedule posts across different platforms.
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
        
        <div className="text-center mt-12">
          <Link
            to="/scheduler"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-postbridge-600 text-white hover:bg-postbridge-700 transition-colors"
          >
            Start Scheduling Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Features;
