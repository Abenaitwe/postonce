
import React from "react";
import { Link } from "react-router-dom";
import { Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <img 
                src="/lovable-uploads/285e931b-320d-44ef-b68d-14edf0be1746.png" 
                alt="Post Once" 
                className="h-10 w-auto"
              />
              <span className="font-bold text-xl text-postbridge-600">Post Once</span>
            </Link>
            <p className="text-gray-600 mb-4 max-w-xs">
              Connect all your social platforms with a single, beautiful link page.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://x.com/Postoncepro" 
                className="text-gray-400 hover:text-postbridge-600" 
                aria-label="Twitter" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link to="/features" className="text-gray-600 hover:text-postbridge-600">Features</Link></li>
              <li><Link to="/pricing" className="text-gray-600 hover:text-postbridge-600">Pricing</Link></li>
              <li><Link to="/examples" className="text-gray-600 hover:text-postbridge-600">Examples</Link></li>
              <li><Link to="/templates" className="text-gray-600 hover:text-postbridge-600">Templates</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-600 hover:text-postbridge-600">About</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-postbridge-600">Blog</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-postbridge-600">Careers</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-postbridge-600">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/help" className="text-gray-600 hover:text-postbridge-600">Help Center</Link></li>
              <li><Link to="/api" className="text-gray-600 hover:text-postbridge-600">API</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-postbridge-600">Privacy</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-postbridge-600">Terms</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Post Once. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li><Link to="/privacy" className="text-gray-500 hover:text-postbridge-600 text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-500 hover:text-postbridge-600 text-sm">Terms of Service</Link></li>
              <li><Link to="/cookies" className="text-gray-500 hover:text-postbridge-600 text-sm">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
