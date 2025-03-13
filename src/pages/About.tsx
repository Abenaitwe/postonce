
import React from "react";
import NavBar from "@/components/navigation/NavBar";
import Footer from "@/components/navigation/Footer";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <section className="py-20 md:py-28">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="mb-6 font-bold text-gray-900">About Post-Bridge</h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                We're on a mission to help creators connect with their audience across all platforms.
              </p>
            </div>

            <div className="max-w-4xl mx-auto mb-20">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Post-Bridge team" 
                className="w-full h-auto rounded-lg shadow-xl mb-8" 
              />
              
              <div className="prose prose-lg max-w-none">
                <p>
                  Founded in 2020, Post-Bridge was created to solve a common problem faced by content creators, influencers, and businesses: how to effectively connect with audiences across multiple social platforms.
                </p>
                
                <p>
                  In today's digital landscape, having a presence on multiple platforms is essential, but directing your audience between these platforms can be challenging. That's where Post-Bridge comes in - providing a simple, elegant solution that lets you share all your content with a single link.
                </p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
                <p>
                  We believe that creators should be able to focus on what they do best: creating amazing content. Our mission is to simplify the way creators connect with their audience by providing tools that are beautiful, effective, and easy to use.
                </p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
                <ul className="space-y-2 mt-4">
                  <li><strong>Simplicity:</strong> We believe in creating tools that are intuitive and easy to use.</li>
                  <li><strong>Elegance:</strong> We care deeply about design and user experience.</li>
                  <li><strong>Empowerment:</strong> We aim to empower creators to build deeper connections with their audiences.</li>
                  <li><strong>Community:</strong> We value the community of creators who use our platform.</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">Meet the Team</h2>
                <p>
                  Post-Bridge is built by a small team of passionate designers, developers, and creators who understand the challenges of managing a multi-platform presence.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <Button size="lg" className="bg-postbridge-600 hover:bg-postbridge-700">
                Join Our Team
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
