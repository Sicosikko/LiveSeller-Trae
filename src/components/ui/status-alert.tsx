
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Check, X } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface StatusAlertProps {
  title: string;
  description?: string;
  variant?: "success" | "error" | "warning";
  onClose?: () => void;
  className?: string;
  actions?: React.ReactNode;
}

export function StatusAlert({
  title,
  description,
  variant = "success",
  onClose,
  className,
  actions,
}: StatusAlertProps) {
  const icons = {
    success: <Check className="h-5 w-5" />,
    error: <X className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />,
  };

  const variantClasses = {
    success: "bg-green-50 border-green-500 text-green-700 dark:bg-green-900/20 dark:text-green-300 dark:border-green-600",
    error: "bg-red-50 border-red-500 text-red-700 dark:bg-red-900/20 dark:text-red-300 dark:border-red-600",
    warning: "bg-yellow-50 border-yellow-500 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-600",
  };

  return (
    <Alert
      className={cn("flex items-center justify-between", variantClasses[variant], className)}
    >
      <div className="flex items-center">
        <div className="mr-3">{icons[variant]}</div>
        <div>
          <AlertTitle className="font-semibold">{title}</AlertTitle>
          {description && <AlertDescription>{description}</AlertDescription>}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {actions}
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </Alert>
  );
}
