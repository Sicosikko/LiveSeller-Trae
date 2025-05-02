
import React from "react";

interface LoadingSpinnerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  text?: string;
  className?: string;
  textClassName?: string;
  centered?: boolean;
  fullScreen?: boolean;
  theme?: "light" | "primary" | "dark";
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = "md", 
  text, 
  className = "",
  textClassName = "",
  centered = false,
  fullScreen = false,
  theme = "primary"
}) => {
  const sizeClass = {
    xs: "h-3 w-3",
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  };
  
  const containerClasses = `
    ${fullScreen ? "fixed inset-0 z-50" : ""} 
    ${centered || fullScreen ? "flex flex-col items-center justify-center" : ""}
    ${className}
  `;
  
  const spinnerBorder = {
    light: "border-white/20 border-t-white",
    primary: "border-primary/20 border-t-primary",
    dark: "border-gray-700 border-t-gray-800"
  };
  
  const textColor = {
    light: "text-white",
    primary: "text-muted-foreground",
    dark: "text-gray-800"
  };
  
  // Adicionar um fundo esmaecido ao fullScreen
  const backdropClass = fullScreen ? "bg-black/20 backdrop-blur-sm" : "";

  return (
    <div className={`${containerClasses} ${backdropClass}`.trim()}>
      <div
        className={`animate-spin rounded-full border-2 border-t-2 ${spinnerBorder[theme]} ${sizeClass[size]}`}
        role="status"
        aria-label="Carregando"
      />
      {text && (
        <p className={`mt-2 ${textColor[theme]} ${textClassName}`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
