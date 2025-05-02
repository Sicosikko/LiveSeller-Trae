
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export interface ProfileData {
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  bio: string;
  avatar: string;
}

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Nome é obrigatório" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().optional(),
  company: z.string().optional(),
  role: z.string().optional(),
  bio: z.string().optional(),
  avatar: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  profile: ProfileData;
  onProfileChange: (data: ProfileData) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ profile, onProfileChange }) => {
  const { t } = useLanguage();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      company: profile.company,
      role: profile.role,
      bio: profile.bio,
      avatar: profile.avatar,
    },
  });

  React.useEffect(() => {
    form.reset(profile);
  }, [profile, form]);

  const handleFormChange = (field: keyof ProfileFormValues, value: string) => {
    form.setValue(field, value);
    const currentValues = form.getValues();
    
    // Ensure all required fields have values before passing to onProfileChange
    const updatedProfile: ProfileData = {
      name: currentValues.name || profile.name,
      email: currentValues.email || profile.email,
      phone: currentValues.phone || profile.phone || "",
      company: currentValues.company || profile.company || "",
      role: currentValues.role || profile.role || "",
      bio: currentValues.bio || profile.bio || "",
      avatar: currentValues.avatar || profile.avatar || ""
    };
    
    onProfileChange(updatedProfile);
  };

  return (
    <Form {...form}>
      <div className="w-full space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('settings.profile.name')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleFormChange("name", e.target.value);
                    }}
                    className="mt-1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('settings.profile.email')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    onChange={(e) => {
                      field.onChange(e);
                      handleFormChange("email", e.target.value);
                    }}
                    className="mt-1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('settings.profile.phone')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleFormChange("phone", e.target.value);
                    }}
                    className="mt-1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('settings.profile.company')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleFormChange("company", e.target.value);
                    }}
                    className="mt-1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('settings.profile.role')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleFormChange("role", e.target.value);
                    }}
                    className="mt-1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('settings.profile.bio')}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleFormChange("bio", e.target.value);
                  }}
                  className="mt-1"
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
};

export default ProfileForm;
