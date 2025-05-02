
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Upload, User, X, Camera } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

interface ProfileAvatarProps {
  avatar: string;
  onAvatarChange: (avatarUrl: string) => void;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ avatar, onAvatarChange }) => {
  const { t } = useLanguage();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Em uma aplicação real, aqui enviaríamos a imagem para um servidor
      // e obteríamos a URL. Para este exemplo, usamos um URL de objeto local
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const cancelImageUpload = () => {
    setPreviewImage(null);
  };

  const confirmImageUpload = () => {
    if (previewImage) {
      onAvatarChange(previewImage);
      setPreviewImage(null);
      toast.success(t('messages.success.profileUpdated'));
    }
  };

  const removeAvatar = () => {
    onAvatarChange("");
    toast.success(t('messages.success.profileUpdated'));
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {previewImage ? (
        <div className="relative">
          <Avatar className="h-24 w-24 border-2 border-primary">
            <AvatarImage src={previewImage} />
          </Avatar>
          <div className="absolute -bottom-3 flex gap-2 justify-center w-full">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={cancelImageUpload} 
              className="h-7 w-7 p-0 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              onClick={confirmImageUpload} 
              className="h-7 w-7 p-0 rounded-full"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <Avatar className="h-24 w-24">
          <AvatarImage src={avatar} />
          <AvatarFallback className="text-2xl">
            <User className="h-12 w-12" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="mt-2" asChild>
          <label className="cursor-pointer">
            <Upload className="mr-2 h-4 w-4" />
            {t('settings.profile.updatePhoto')}
            <input 
              type="file" 
              onChange={handleImageUpload}
              className="hidden" 
              accept="image/*"
            />
          </label>
        </Button>
        {avatar && !previewImage && (
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2"
            onClick={removeAvatar}
          >
            {t('settings.profile.removePhoto')}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileAvatar;
