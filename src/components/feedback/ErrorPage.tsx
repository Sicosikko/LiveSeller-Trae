
import React from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface ErrorPageProps {
  title?: string;
  message?: string;
  actionText?: string;
  actionLink?: string;
  onRetry?: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  title,
  message,
  actionText,
  actionLink = "/",
  onRetry,
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
          <AlertTriangle className="h-12 w-12 text-red-600 dark:text-red-400" />
        </div>
        
        <h2 className="mb-2 text-2xl font-bold">{title || t('common.error')}</h2>
        
        {message && (
          <p className="mb-6 text-muted-foreground">{message}</p>
        )}
        
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0 justify-center">
          {onRetry && (
            <Button onClick={onRetry}>
              {t('common.retry')}
            </Button>
          )}
          
          {/* Replace 'as={Link} to={actionLink}' with a Link component wrapper */}
          <Link to={actionLink}>
            <Button
              variant={onRetry ? "outline" : "default"}
            >
              {actionText || t('common.goBack')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
