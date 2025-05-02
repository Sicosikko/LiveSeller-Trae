
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader } from "lucide-react";

const LanguageSettings: React.FC = () => {
  const { currentLanguage, setLanguage, getSupportedLanguages, t } = useLanguage();
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState(currentLanguage);

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value as any);
  };

  const saveLanguageSettings = () => {
    setIsLoading(true);
    
    // Simular um pequeno atraso para mostrar o indicador de carregamento
    setTimeout(() => {
      setLanguage(selectedLanguage as any);
      setIsLoading(false);
    }, 800);
  };

  const languages = getSupportedLanguages();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t('settings.language.title')}</h3>
        <p className="text-sm text-muted-foreground">
          {t('settings.language.subtitle')}
        </p>
      </div>

      <RadioGroup 
        value={selectedLanguage} 
        onValueChange={handleLanguageChange} 
        className="space-y-3"
      >
        {languages.map((language) => (
          <div key={language.id} className="flex items-center space-x-2 rounded-md border p-3">
            <RadioGroupItem value={language.id} id={language.id} />
            <Label htmlFor={language.id} className="flex-1 cursor-pointer">
              {language.name}
            </Label>
          </div>
        ))}
      </RadioGroup>

      <Button 
        onClick={saveLanguageSettings} 
        className="mt-4"
        disabled={isLoading || currentLanguage === selectedLanguage}
      >
        {isLoading ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" />
            {t('common.loading')}
          </>
        ) : (
          t('settings.language.saveChanges')
        )}
      </Button>
    </div>
  );
};

export default LanguageSettings;
