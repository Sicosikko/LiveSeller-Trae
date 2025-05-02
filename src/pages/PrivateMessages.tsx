
import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import PrivateMessagesComponent from "@/components/admin/PrivateMessages";

const PrivateMessages: React.FC = () => {
  return (
    <MainLayout title="Mensagens Privadas">
      <PrivateMessagesComponent />
    </MainLayout>
  );
};

export default PrivateMessages;
