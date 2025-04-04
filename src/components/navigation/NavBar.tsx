
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const NavBar = () => {
  const { session, signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="border-b border-gray-100 py-4">
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/285e931b-320d-44ef-b68d-14edf0be1746.png" 
            alt="Post Once" 
            className="h-8 w-auto" 
          />
          <span className="font-bold text-xl text-postbridge-600">Post Once</span>
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
          {session && (
            <>
              <Link to="/scheduler" className="text-gray-600 hover:text-postbridge-600 transition-colors">
                Scheduler
              </Link>
              <Link to="/accounts" className="text-gray-600 hover:text-postbridge-600 transition-colors">
                Accounts
              </Link>
            </>
          )}
        </nav>
        <div className="flex items-center space-x-3">
          {session ? (
            <Button 
              variant="outline" 
              className="hidden md:inline-flex"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          ) : (
            <>
              <Button 
                variant="outline" 
                className="hidden md:inline-flex"
                onClick={() => navigate("/auth")}
              >
                Sign In
              </Button>
              <Button 
                className="bg-postbridge-600 hover:bg-postbridge-700"
                onClick={() => {
                  navigate("/auth");
                  // Set the tab to signup
                }}
              >
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
