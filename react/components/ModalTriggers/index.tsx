import React, { useState}from "react";
import { Modal } from "vtex.styleguide";
import { useProduct } from "vtex.product-context";
import "./global.css";
interface ProductAvailableProps {
  // children: any;
}

const ModalTriggers: StorefrontFunctionComponent<ProductAvailableProps> = () => {
  const [ShowModalcarencias, setShowModalcarencias] = useState(false);
  const [ShowModalcondicoes, setShowModalcondicoes] = useState(false);

  return (
    <>
      <div className="product-triggers">
        <span className="modal-link-pdp" onClick={() => {
         setShowModalcarencias(true);
       }}>
        Consulte carências
        </span>
        <span>
        e
        </span>
        <span className="modal-link-pdp" onClick={() => {
         setShowModalcondicoes(true);
       }}> 
        Confira condições
        </span>
      
      </div>




      <Modal
        isOpen={ShowModalcarencias}
        onClose={() => {
          setShowModalcarencias(false);
        }}
        centered
        responsiveFullScreen
      >
      </Modal>

      <Modal
        isOpen={ShowModalcondicoes}
        onClose={() => {
          setShowModalcondicoes(false);
        }}
        centered
        responsiveFullScreen
      >
        
      </Modal>
    </>
  );
};

export default ModalTriggers;
