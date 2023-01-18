import React, { useState, useEffect } from "react";
import { Modal } from "vtex.styleguide";
import { useProduct } from "vtex.product-context";
import "./global.css";
interface ProductAvailableProps {
  // children: any;
}

const ModalTriggers: StorefrontFunctionComponent<
  ProductAvailableProps
> = () => {
  const [ShowModalcarencias, setShowModalcarencias] = useState(false);
  const [ShowModalcondicoes, setShowModalcondicoes] = useState(false);
  const [carencia, setcarencias] = useState("");
  const [condicoes, setcondicoes] = useState("");
  const productInfo = useProduct();

  useEffect(() => {
    const currentProd = productInfo?.selectedItem?.itemId;
console.log(productInfo);
    switch (currentProd) {
      case "5":
        setcarencias(`/arquivos/dental_lite+ortodontia1.png`);
        setcondicoes(`/arquivos/dental_lite+ortodontia2.png`);
        break;
      case "7":
        setcarencias(`/arquivos/dental_lite+ortodontia_protese1.png`);
        setcondicoes(`/arquivos/dental_lite+ortodontia_protese2.png`);
        break;
      case "12":
        setcarencias(`/arquivos/dental_lite1.png`);
        setcondicoes(`/arquivos/dental_lite2.png`);
        break;
      case "11":
        setcarencias(`/arquivos/dental_pro20+ortodontia_alinhador_1.png`);
        setcondicoes(`/arquivos/dental_pro20+ortodontia_alinhador_2.png`);
        break;
      case "9":
        setcarencias(`/arquivos/dental_pro10+ortodontia_protese_1.png`);
        setcondicoes(`/arquivos/dental_pro10+ortodontia_protese_2.png`);
        break;
      case "13":
        setcarencias(`/arquivos/dental_pro10_1.png`);
        setcondicoes(`/arquivos/dental_pro10_2.png`);
        break;
    }
 
  }, []);

 

  return (
    <>
      <div className="product-triggers">
        <span
          className="modal-link-pdp"
          onClick={() => {
            setShowModalcarencias(true);
          }}
        >
          Consulte carências
        </span>
        <span>e</span>
        <span
          className="modal-link-pdp"
          onClick={() => {
            setShowModalcondicoes(true);
          }}
        >
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
        className="teste"
      >
        <img src={carencia} />
      </Modal>

      <Modal
        isOpen={ShowModalcondicoes}
        onClose={() => {
          setShowModalcondicoes(false);
        }}
        centered
        responsiveFullScreen
      >
        <img src={condicoes} />
      </Modal>
    </>
  );
};

export default ModalTriggers;
