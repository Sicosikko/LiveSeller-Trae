
import React from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useLanguage } from "@/contexts/LanguageContext";

interface LoadingPageProps {
  title?: string;
  message?: string;
}

const LoadingPage: React.FC<LoadingPageProps> = ({
  title,
  message,
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
        
        <h2 className="mb-2 text-2xl font-bold">{title || t('common.loading')}</h2>
        
        {message && (
          <p className="mb-6 text-muted-foreground">{message}</p>
        )}
      </div>
    </div>
  );
};

export default LoadingPage;
