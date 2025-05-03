
import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import PlatformStatusDisplay from "@/components/platform-status/PlatformStatusDisplay";

const PlatformStatusPage: React.FC = () => {
  return (
    <MainLayout title="Status da Plataforma">
      <PlatformStatusDisplay />
    </MainLayout>
  );
};

export default PlatformStatusPage;