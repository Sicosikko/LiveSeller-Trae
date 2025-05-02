
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useForm, UseFormReturn } from "react-hook-form";
import { ProfileData } from "./ProfileForm";

interface ProfileActionsProps {
  onSave: () => void;
  isLoading: boolean;
  form?: UseFormReturn<any>;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({ 
  onSave, 
  isLoading,
  form
}) => {
  const { t } = useLanguage();

  const handleSave = () => {
    if (form) {
      form.handleSubmit(onSave)();
    } else {
      onSave();
    }
  };

  return (
    <div className="flex justify-end">
      <Button onClick={handleSave} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" />
            {t('common.loading')}
          </>
        ) : (
          t('settings.profile.saveChanges')
        )}
      </Button>
    </div>
  );
};

export default ProfileActions;
