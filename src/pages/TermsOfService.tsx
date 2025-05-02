
import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { useLanguage } from "@/contexts/LanguageContext";

const TermsOfService: React.FC = () => {
  const { t } = useLanguage();

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">{t('legal.termsOfService')}</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>{t('legal.termsTitle1')}</h2>
          <p>{t('legal.termsContent1')}</p>
          
          <h2>{t('legal.termsTitle2')}</h2>
          <p>{t('legal.termsContent2')}</p>
          
          <h2>{t('legal.termsTitle3')}</h2>
          <p>{t('legal.termsContent3')}</p>
          
          <h2>{t('legal.termsTitle4')}</h2>
          <p>{t('legal.termsContent4')}</p>
          
          <h2>{t('legal.termsTitle5')}</h2>
          <p>{t('legal.termsContent5')}</p>
          
          <h2>{t('legal.lastUpdated')}</h2>
          <p>{t('legal.lastUpdatedDate')}</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default TermsOfService;
