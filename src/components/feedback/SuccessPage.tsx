
import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface SuccessPageProps {
  title?: string;
  message?: string;
  actionText?: string;
  actionLink?: string;
  secondaryActionText?: string;
  secondaryActionLink?: string;
  onAction?: () => void;
}

const SuccessPage: React.FC<SuccessPageProps> = ({
  title,
  message,
  actionText,
  actionLink = "/",
  secondaryActionText,
  secondaryActionLink,
  onAction,
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
          <Check className="h-12 w-12 text-green-600 dark:text-green-400" />
        </div>
        
        <h2 className="mb-2 text-2xl font-bold">{title || t('common.success')}</h2>
        
        {message && (
          <p className="mb-6 text-muted-foreground">{message}</p>
        )}
        
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0 justify-center">
          {actionText && (
            onAction ? (
              <Button onClick={onAction}>
                {actionText}
              </Button>
            ) : (
              <Link to={actionLink}>
                <Button>
                  {actionText}
                </Button>
              </Link>
            )
          )}
          
          {secondaryActionText && secondaryActionLink && (
            <Link to={secondaryActionLink}>
              <Button variant="outline">
                {secondaryActionText}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
