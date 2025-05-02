
import { useState } from "react";

export interface PaymentMethodState {
  enabled: boolean;
  configured: boolean;
}

export interface PaymentMethodsState {
  pix: PaymentMethodState;
  paypal: PaymentMethodState;
  pagseguro: PaymentMethodState;
  mercadopago: PaymentMethodState;
  creditcard: PaymentMethodState;
  wallets: PaymentMethodState;
}

export const usePaymentMethods = () => {
  const [methods, setMethods] = useState<PaymentMethodsState>({
    pix: { enabled: true, configured: true },
    paypal: { enabled: false, configured: false },
    pagseguro: { enabled: false, configured: false },
    mercadopago: { enabled: true, configured: true },
    creditcard: { enabled: true, configured: true },
    wallets: { enabled: false, configured: false },
  });

  const handleToggleMethod = (method: keyof PaymentMethodsState) => {
    setMethods(prev => ({
      ...prev,
      [method]: { ...prev[method], enabled: !prev[method].enabled }
    }));
  };

  return { methods, handleToggleMethod };
};
