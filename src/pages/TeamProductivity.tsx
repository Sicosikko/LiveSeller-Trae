
import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import TeamProductivityComponent from "@/components/admin/TeamProductivity";

const TeamProductivity: React.FC = () => {
  return (
    <MainLayout title="Produtividade da Equipe">
      <TeamProductivityComponent />
    </MainLayout>
  );
};

export default TeamProductivity;
