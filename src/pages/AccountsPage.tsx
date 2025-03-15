
import React from "react";
import NavBar from "@/components/navigation/NavBar";
import Footer from "@/components/navigation/Footer";
import ConnectedAccounts from "@/components/accounts/ConnectedAccounts";

const AccountsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow py-12">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Connected Accounts</h1>
              <p className="text-xl text-gray-600">
                Connect your social media accounts to post across multiple platforms.
              </p>
            </div>
            <ConnectedAccounts />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccountsPage;
