
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <h1 className="mb-6 font-bold text-gray-900">
            Connect your social presence with a single link
          </h1>
          <p className="mb-8 text-xl text-gray-600 leading-relaxed">
            Post-Bridge gives you a beautiful, customizable link page that helps you connect with your audience across platforms.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-postbridge-600 hover:bg-postbridge-700">
              Create Your Link Page <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              View Examples
            </Button>
          </div>
        </div>
        <div className="mt-16 max-w-4xl mx-auto rounded-lg shadow-xl overflow-hidden animate-fade-up">
          <img 
            src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Post-Bridge platform preview" 
            className="w-full h-auto object-cover" 
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
