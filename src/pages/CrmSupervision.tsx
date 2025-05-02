
import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import CrmSupervisionComponent from "@/components/admin/CrmSupervision";

const CrmSupervision: React.FC = () => {
  return (
    <MainLayout title="Supervisão de CRM">
      <CrmSupervisionComponent />
    </MainLayout>
  );
};

export default CrmSupervision;
