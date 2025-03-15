
import React from "react";
import NavBar from "@/components/navigation/NavBar";
import Footer from "@/components/navigation/Footer";
import SchedulerForm from "@/components/scheduler/SchedulerForm";

const SchedulerPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow py-12">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Schedule Your Social Media Posts</h1>
              <p className="text-xl text-gray-600">
                Create one post and share it across multiple platforms at the perfect time.
              </p>
            </div>
            <SchedulerForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SchedulerPage;
