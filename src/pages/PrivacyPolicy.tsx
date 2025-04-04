
import React from "react";
import NavBar from "@/components/navigation/NavBar";
import Footer from "@/components/navigation/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow py-12">
        <div className="container-custom max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose max-w-none">
            <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p className="mb-4">
              Welcome to Post Once. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you about how we look after your personal data when you visit our website 
              and tell you about your privacy rights and how the law protects you.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Data We Collect</h2>
            <p className="mb-4">
              We collect and process the following information when you use our services:
            </p>
            <ul className="list-disc pl-8 mb-4">
              <li>Personal identification information (Name, email address)</li>
              <li>Account credentials for social media platforms you connect with our service</li>
              <li>Content you share through our platform</li>
              <li>Usage data and analytics</li>
              <li>Cookies and tracking information</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Your Data</h2>
            <p className="mb-4">
              We use your personal data for the following purposes:
            </p>
            <ul className="list-disc pl-8 mb-4">
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>To allow you to participate in interactive features of our service</li>
              <li>To provide customer support</li>
              <li>To gather analytics to improve our service</li>
              <li>To monitor the usage of our service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Social Media Integration</h2>
            <p className="mb-4">
              Our service allows you to connect to various social media platforms. When you connect your social media 
              accounts to our service, we only access the information that you have specifically authorized, and we 
              only use it for the purposes you have approved. We do not store your social media passwords.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Security</h2>
            <p className="mb-4">
              The security of your data is important to us. We implement appropriate security measures to protect 
              your personal information. However, no method of transmission over the Internet or method of electronic 
              storage is 100% secure, and we cannot guarantee absolute security.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Updates to This Policy</h2>
            <p className="mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p>
              Email: admin@postonce.pro
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
