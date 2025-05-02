
import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import ProfileSettings from "@/components/settings/ProfileSettings";
import { Card } from "@/components/ui/card";

const Profile: React.FC = () => {
  return (
    <MainLayout title="Perfil">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium">Seu Perfil</h2>
          <p className="text-sm text-muted-foreground">
            Gerencie suas informações pessoais e preferências de conta
          </p>
        </div>
        <Card className="p-6">
          <ProfileSettings />
        </Card>
      </div>
    </MainLayout>
  );
};

export default Profile;
