
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { StatusAlert } from "@/components/ui/status-alert";
import ProfileAvatar from "./profile/ProfileAvatar";
import ProfileForm, { ProfileData } from "./profile/ProfileForm";
import ProfileActions from "./profile/ProfileActions";
import { AuditLogger } from "@/services/audit/AuditLogger";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const profileSchema = z.object({
  name: z.string().min(2, { message: "Nome é obrigatório" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().optional(),
  company: z.string().optional(),
  role: z.string().optional(),
  bio: z.string().optional(),
  avatar: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfileSettings: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [profile, setProfile] = useState<ProfileData>({
    name: "João Silva",
    email: "joao.silva@exemplo.com",
    phone: "(11) 98765-4321",
    company: "Empresa LTDA",
    role: "Gerente",
    bio: "Profissional de marketing com mais de 5 anos de experiência em estratégias digitais.",
    avatar: ""
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      company: profile.company,
      role: profile.role,
      bio: profile.bio,
      avatar: profile.avatar
    }
  });

  const handleProfileChange = (updatedProfile: ProfileData) => {
    setProfile(updatedProfile);
  };

  const handleAvatarChange = (avatarUrl: string) => {
    setProfile(prev => ({
      ...prev,
      avatar: avatarUrl
    }));
  };

  const saveProfile = async () => {
    setIsLoading(true);
    
    try {
      // Simular uma chamada de API com um pequeno atraso
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Registrar ação de auditoria
      await AuditLogger.logAction(
        'update',
        'user-profile',
        { profileId: profile.email },
        'success'
      );
      
      setShowSuccess(true);
      
      // Ocultar a mensagem de sucesso após 5 segundos
      setTimeout(() => setShowSuccess(false), 5000);
      
      toast.success(t('settings.profile.profileUpdated'));
    } catch (error) {
      // Registrar erro de auditoria
      await AuditLogger.logAction(
        'update',
        'user-profile',
        { profileId: profile.email, error },
        'failure'
      );
      
      toast.error(t('messages.error.updateFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t('settings.profile.title')}</h3>
        <p className="text-sm text-muted-foreground">
          {t('settings.profile.subtitle')}
        </p>
      </div>

      {showSuccess && (
        <StatusAlert
          variant="success"
          title={t('settings.profile.profileUpdated')}
          onClose={() => setShowSuccess(false)}
          className="mb-4"
        />
      )}

      <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 pb-6 border-b">
        <ProfileAvatar 
          avatar={profile.avatar} 
          onAvatarChange={handleAvatarChange} 
        />
        <ProfileForm 
          profile={profile} 
          onProfileChange={handleProfileChange} 
        />
      </div>

      <ProfileActions 
        onSave={saveProfile} 
        isLoading={isLoading}
        form={form} 
      />
    </div>
  );
};

export default ProfileSettings;
