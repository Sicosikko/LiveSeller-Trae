import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import AdminOnboarding from "@/components/onboarding/AdminOnboarding";
import EmployeeOnboarding from "@/components/onboarding/EmployeeOnboarding";
import { Loader } from "lucide-react";

const OnboardingPage: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simple check to determine if we're ready to show the onboarding
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-10 w-10 animate-spin mx-auto text-[#1E3A8A]" />
          <p className="mt-4 text-lg text-gray-600">Preparando sua experiência...</p>
        </div>
      </div>
    );
  }

  // If user is admin or developer, show the admin onboarding
  // Otherwise show the employee onboarding
  const isAdmin = user?.role === "admin" || user?.email?.includes("@dev.");
  
  return isAdmin ? <AdminOnboarding /> : <EmployeeOnboarding />;
};

export default OnboardingPage;
