
import React from "react";

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
}

export const SkipLink: React.FC<SkipLinkProps> = ({ href, children }) => {
  return (
    <a 
      href={href} 
      className="skip-to-content" 
      aria-label={typeof children === 'string' ? children : "Pular para o conteúdo principal"}
    >
      {children}
    </a>
  );
};
