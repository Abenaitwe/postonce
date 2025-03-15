
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NavBar = () => {
  return (
    <header className="border-b border-gray-100 py-4">
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl text-postbridge-600">Post-Bridge</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-postbridge-600 transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-postbridge-600 transition-colors">
            About
          </Link>
          <Link to="/features" className="text-gray-600 hover:text-postbridge-600 transition-colors">
            Features
          </Link>
          <Link to="/scheduler" className="text-gray-600 hover:text-postbridge-600 transition-colors">
            Scheduler
          </Link>
        </nav>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="hidden md:inline-flex">
            Sign In
          </Button>
          <Button className="bg-postbridge-600 hover:bg-postbridge-700">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
