
import React from "react";
import NavBar from "@/components/navigation/NavBar";
import Footer from "@/components/navigation/Footer";
import CTA from "@/components/home/CTA";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Globe, Share2, Users, Zap, PenTool, Smartphone, 
  BarChart2, Lock, Palette, Clock, Globe2, Database 
} from "lucide-react";

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
  },
  {
    icon: <BarChart2 className="h-10 w-10 text-postbridge-600" />,
    title: "Advanced Analytics",
    description: "Track visits, clicks, and engagement to understand which platforms are performing best."
  },
  {
    icon: <Lock className="h-10 w-10 text-postbridge-600" />,
    title: "Secure & Reliable",
    description: "Built with security in mind, ensuring your data and your audience's data is always protected."
  },
  {
    icon: <Palette className="h-10 w-10 text-postbridge-600" />,
    title: "Beautiful Themes",
    description: "Choose from dozens of professionally designed themes or create your own custom design."
  },
  {
    icon: <Clock className="h-10 w-10 text-postbridge-600" />,
    title: "Scheduled Links",
    description: "Set links to appear and disappear at specific times, perfect for limited-time promotions."
  },
  {
    icon: <Globe2 className="h-10 w-10 text-postbridge-600" />,
    title: "Custom Domains",
    description: "Use your own domain for a fully branded experience that builds trust with your audience."
  },
  {
    icon: <Database className="h-10 w-10 text-postbridge-600" />,
    title: "API Access",
    description: "Integrate Post-Bridge with your existing tools and workflows through our developer API."
  }
];

const FeaturesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <section className="py-20 md:py-28">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="mb-6 font-bold text-gray-900">Features</h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Everything you need to connect with your audience across all platforms.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {features.map((feature, index) => (
                <Card key={index} className="border border-gray-100 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="mb-5">{feature.icon}</div>
                    <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">How is Post-Bridge different from other link-in-bio tools?</h3>
                  <p className="text-gray-600">
                    Post-Bridge focuses on elegant design, ease of use, and powerful features that help you truly bridge the gap between your different social presences. Our platform is built with creators in mind, offering more customization and analytics than typical link-in-bio tools.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">Can I use my own domain with Post-Bridge?</h3>
                  <p className="text-gray-600">
                    Yes! With our Pro and Business plans, you can connect your own custom domain for a fully branded experience. This helps build trust with your audience and creates a more professional impression.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">Is there a limit to how many links I can add?</h3>
                  <p className="text-gray-600">
                    Free accounts can add up to 5 links, while Pro and Business accounts can add unlimited links to their pages. This gives you the flexibility to share all your content in one place.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">Can I see analytics for my Post-Bridge page?</h3>
                  <p className="text-gray-600">
                    Absolutely! All plans include analytics, with more detailed data available on Pro and Business plans. You can track page visits, link clicks, geographic information, and more to understand your audience better.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default FeaturesPage;
