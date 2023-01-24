import React from "react";

import "./global.css";
interface ProductAvailableProps {
  // children: any;
}

const PaymentTypes: StorefrontFunctionComponent<
  ProductAvailableProps
> = () => {
 
 
 

  return (
    <div className="payment-types">
    <span>Formas de pagamento:</span>
    <img src="/arquivos/cartao-boleto.png" alt="" />
   
    </div>
  );
};

export default PaymentTypes;
