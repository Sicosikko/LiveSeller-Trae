
import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { useLanguage } from "@/contexts/LanguageContext";

const PrivacyPolicy: React.FC = () => {
  const { t } = useLanguage();

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">{t('legal.privacyPolicy')}</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>{t('legal.privacyTitle1')}</h2>
          <p>{t('legal.privacyContent1')}</p>
          
          <h2>{t('legal.privacyTitle2')}</h2>
          <p>{t('legal.privacyContent2')}</p>
          
          <h2>{t('legal.privacyTitle3')}</h2>
          <p>{t('legal.privacyContent3')}</p>
          
          <h2>{t('legal.privacyTitle4')}</h2>
          <p>{t('legal.privacyContent4')}</p>
          
          <h2>{t('legal.privacyTitle5')}</h2>
          <p>{t('legal.privacyContent5')}</p>
          
          <h2>{t('legal.lastUpdated')}</h2>
          <p>{t('legal.lastUpdatedDate')}</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default PrivacyPolicy;
