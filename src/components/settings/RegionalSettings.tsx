
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const RegionalSettings: React.FC = () => {
  const { t } = useLanguage();
  const [regionalSettings, setRegionalSettings] = useState({
    currency: "BRL",
    timezone: "America/Sao_Paulo",
    dateFormat: "DD/MM/YYYY"
  });
  const { toast } = useToast();

  const handleCurrencyChange = (value: string) => {
    setRegionalSettings(prev => ({
      ...prev,
      currency: value
    }));
  };

  const handleTimezoneChange = (value: string) => {
    setRegionalSettings(prev => ({
      ...prev,
      timezone: value
    }));
  };

  const handleDateFormatChange = (value: string) => {
    setRegionalSettings(prev => ({
      ...prev,
      dateFormat: value
    }));
  };

  const saveRegionalSettings = () => {
    // Aqui implementaríamos a lógica para salvar as configurações regionais
    toast({
      title: t('common.success'),
      description: "Configurações regionais atualizadas com sucesso.",
    });
  };

  const currencies = [
    { id: "BRL", name: "Real Brasileiro (R$)" },
    { id: "USD", name: "US Dollar ($)" },
    { id: "EUR", name: "Euro (€)" },
    { id: "GBP", name: "British Pound (£)" },
  ];

  const timezones = [
    { id: "America/Sao_Paulo", name: "Brasília (GMT-3)" },
    { id: "America/New_York", name: "New York (GMT-4)" },
    { id: "Europe/London", name: "London (GMT+1)" },
    { id: "Europe/Paris", name: "Paris (GMT+2)" },
    { id: "Asia/Tokyo", name: "Tokyo (GMT+9)" },
  ];

  const dateFormats = [
    { id: "DD/MM/YYYY", name: "DD/MM/YYYY" },
    { id: "MM/DD/YYYY", name: "MM/DD/YYYY" },
    { id: "YYYY-MM-DD", name: "YYYY-MM-DD" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t('settings.regional.title')}</h3>
        <p className="text-sm text-muted-foreground">
          {t('settings.regional.subtitle')}
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="currency">{t('settings.regional.currency')}</Label>
          <Select
            value={regionalSettings.currency}
            onValueChange={handleCurrencyChange}
          >
            <SelectTrigger id="currency" className="w-full">
              <SelectValue placeholder="Selecione a moeda" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.id} value={currency.id}>
                  {currency.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timezone">{t('settings.regional.timezone')}</Label>
          <Select
            value={regionalSettings.timezone}
            onValueChange={handleTimezoneChange}
          >
            <SelectTrigger id="timezone" className="w-full">
              <SelectValue placeholder="Selecione o fuso horário" />
            </SelectTrigger>
            <SelectContent>
              {timezones.map((timezone) => (
                <SelectItem key={timezone.id} value={timezone.id}>
                  {timezone.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date-format">{t('settings.regional.dateFormat')}</Label>
          <Select
            value={regionalSettings.dateFormat}
            onValueChange={handleDateFormatChange}
          >
            <SelectTrigger id="date-format" className="w-full">
              <SelectValue placeholder="Selecione o formato de data" />
            </SelectTrigger>
            <SelectContent>
              {dateFormats.map((format) => (
                <SelectItem key={format.id} value={format.id}>
                  {format.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button onClick={saveRegionalSettings} className="mt-4">
        {t('settings.regional.saveChanges')}
      </Button>
    </div>
  );
};

export default RegionalSettings;
