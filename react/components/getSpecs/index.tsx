import React from "react";
import { useProduct } from "vtex.product-context";
import "./global.css";
interface ProductAvailableProps {
  // children: any;
}

const getSpecs: StorefrontFunctionComponent<ProductAvailableProps> = () => {
  const productInfo = useProduct();
  const specs = productInfo?.product?.properties[0].values;
  console.log(productInfo)
  let specsGrid1 = [];
  let specsGrid2 = [];

  for (let i = 0; i < specs!.length; i++) {
    
    let okIcon = "";
    if (productInfo?.product?.properties[0].name == "LITE") {
      okIcon = "ok-roxo.svg";
    } else if (productInfo?.product?.properties[0].name == "PRO") {
      okIcon = "ok-verde.svg";
    }

    switch (specs![i]) {
      case "Clareamento":
      case "Ortodontia":
      case "Prótese":
      case "Alinhador":
        okIcon = "ok-azul.svg";
        break;
      case "Acesso a Clínicas próprias":
        okIcon = "ok-azul_marinho.svg";
        break;
    }
    if (i < 7) {
      specsGrid1.push(
        <li key={specs![i]}>
          <img src={`/arquivos/${okIcon}`} />
          <p>{specs![i]}</p>
        </li>
      );
    } else {
      specsGrid2.push(
        <li key={specs![i]}>
          <img src={`/arquivos/${okIcon}`} />
          <p>{specs![i]}</p>
        </li>
      );
    }
  }

  return (
    <>
      <div className="product-specifications">
        <ul className="col">{specsGrid1}</ul>
        <ul className="col">{specsGrid2}</ul>
      </div>
    </>
  );
};

export default getSpecs;
