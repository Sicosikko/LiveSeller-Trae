
import React from "react";
import { usePaymentMethods } from "./methods/hooks/usePaymentMethods";
import PixMethod from "./methods/PixMethod";
import PayPalMethod from "./methods/PayPalMethod";
import PagSeguroMethod from "./methods/PagSeguroMethod";
import MercadoPagoMethod from "./methods/MercadoPagoMethod";
import CreditCardMethod from "./methods/CreditCardMethod";
import WalletsMethod from "./methods/WalletsMethod";

const PaymentMethods: React.FC = () => {
  const { methods, handleToggleMethod } = usePaymentMethods();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <PixMethod 
        enabled={methods.pix.enabled} 
        configured={methods.pix.configured} 
        onToggle={() => handleToggleMethod('pix')} 
      />
      
      <PayPalMethod 
        enabled={methods.paypal.enabled} 
        configured={methods.paypal.configured} 
        onToggle={() => handleToggleMethod('paypal')} 
      />
      
      <PagSeguroMethod 
        enabled={methods.pagseguro.enabled} 
        configured={methods.pagseguro.configured} 
        onToggle={() => handleToggleMethod('pagseguro')} 
      />
      
      <MercadoPagoMethod 
        enabled={methods.mercadopago.enabled} 
        configured={methods.mercadopago.configured} 
        onToggle={() => handleToggleMethod('mercadopago')} 
      />
      
      <CreditCardMethod 
        enabled={methods.creditcard.enabled} 
        configured={methods.creditcard.configured} 
        onToggle={() => handleToggleMethod('creditcard')} 
      />
      
      <WalletsMethod 
        enabled={methods.wallets.enabled} 
        configured={methods.wallets.configured} 
        onToggle={() => handleToggleMethod('wallets')} 
      />
    </div>
  );
};

export default PaymentMethods;
