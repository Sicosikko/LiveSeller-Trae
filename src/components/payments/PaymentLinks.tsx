
import React from "react";
import PaymentLinks from "./links/PaymentLinks";
import { useApp } from "@/contexts/AppContext";

const PaymentLinksWrapper: React.FC = () => {
  const { isConnected } = useApp();

  return (
    <div className="space-y-4">
      {!isConnected && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-3 rounded-md text-amber-600 dark:text-amber-400 text-sm">
          Alguns recursos podem estar limitados enquanto estiver offline.
        </div>
      )}
      <PaymentLinks />
    </div>
  );
};

export default PaymentLinksWrapper;
