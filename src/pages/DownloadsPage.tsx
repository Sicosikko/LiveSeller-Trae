
import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import DownloadLayout from "@/components/downloads/DownloadLayout";

const DownloadsPage: React.FC = () => {
  return (
    <MainLayout title="Downloads">
      <DownloadLayout />
    </MainLayout>
  );
};

export default DownloadsPage;
