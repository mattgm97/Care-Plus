import React, { useState, useEffect } from "react";
import "./global.css";
import ProductCard from "./ProductCard";
interface ProductAvailableProps {
  // children: any;
}

const ProductCompare: StorefrontFunctionComponent<
  ProductAvailableProps
> = () => {
  const [productsAvailable, setProductsAvailable] = useState<any[]>([]);
  const [productsSelected, setProductsSelected] = useState<any[]>([]);
  const [selectionScreen, setSelectionScreen] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/io/_v/api/intelligent-search/product_search")
      .then((res) => {
        return res.json();
      })
      .then((r) => {
        setProductsAvailable(r.products);
      });
  }, []);

  useEffect(() => {
    console.log(productsSelected);
  }, [productsSelected]);

  const onSelectItem = (itemData: any, command: string = "") => {
    if (command === "remove") {
      let updatedItems = productsSelected.filter(
        (item: any) => item.id !== itemData.id
      );
      setProductsSelected([...updatedItems]);
    } else if (command === "clean") {
      setProductsSelected([]);
    } else {
      if (productsSelected.length < 4) {
        setProductsSelected((prev: any) => [...prev, itemData]);
      } else {
        alert("Não é possível escolher mais que 4 produtos");
      }
    }
  };
  const renderProductList = () => {
    return (
      <div className="selectorField">
        <ul>
          {productsAvailable.map((element) => {
            let isSelected = productsSelected.some(
              (item) => item.id === element.productId
            );
            return (
              <li key={element.productId}>
                <ProductCard
                  productName={element.productName}
                  selectedProd={isSelected}
                  productPrice={element.priceRange.sellingPrice.highPrice}
                  addSelectedItem={() =>
                    onSelectItem({
                      id: element.productId,
                      name: element.productName,
                      price: element.priceRange.sellingPrice.highPrice,
                      specs: element.properties[0].values,
                      link: element.link,
                    })
                  }
                  RemoveSelectedItem={() =>
                    onSelectItem(
                      {
                        id: element.productId,
                        name: element.productName,
                        price: element.priceRange.sellingPrice.highPrice,
                        specs: element.properties[0].values,
                        link: element.link,
                      },
                      "remove"
                    )
                  }
                />
              </li>
            );
          })}
        </ul>

        <span className="cleanAll" onClick={() => setProductsSelected([])}>
          Desmarcar todos os itens
        </span>

        <button
          className="submitSelectedProds"
          onClick={() => setSelectionScreen(false)}
        >
          Comparar planos selecionados
        </button>
      </div>
    );
  };

  const renderComparisonList = () => {
    return (
      <div className="comparisonTable">
        <table>
          <tr>
            <th>
              <img
                src="/arquivos/comparisonIMG.png"
                alt=""
                className="imageTable"
              />
            </th>
            {productsSelected.map((element) => {
              let mainTitle = "";
              let properName = "";

              if (element.name.includes("Dental Pro10")) {
                mainTitle = "Dental Pro10";
                properName = element.name.split("Dental Pro10 ")[1];
              } else if (element.name.includes("Dental Pro20")) {
                mainTitle = "Dental Pro20";
                properName = element.name.split("Dental Pro20 ")[1];
              } else if (element.name.includes("Dental Lite")) {
                mainTitle = "Dental Lite";
                properName = element.name.split("Dental Lite ")[1];
              }
              return (
                <th>
                  <span className="title-header">
                    {mainTitle} {properName == undefined ? "" : "+"}
                  </span>
                  <span className="title-header-secondary">{properName}</span>
                  <span className="price-header">{element.price} </span>
                  <span className="mensalidade-header">por mês</span>
                  <a className="linkProduct-header" target="_blank" href={element.link}>Contratar plano</a>
                </th>
              );
            })}
          </tr>
          <tr>
            <td>Múltiplo Reembolso</td>
          </tr>
          <tr>
            <td>Valor de Reembolso da Consulta </td>
          </tr>
          <tr>
            <td>Care Plus Clinic</td>
          </tr>
          <tr>
            <td>Clareamento dentário</td>
          </tr>
          <tr>
            <td>Clínica Geral / Diagnóstico</td>
          </tr>
          <tr>
            <td>Urgência e Emergência</td>
          </tr>
          <tr>
            <td>Prevenção</td>
          </tr>
          <tr>
            <td>Odontopediatria</td>
          </tr>
          <tr>
            <td>Pacientes Especiais</td>
          </tr>
          <tr>
            <td>Dentística</td>
          </tr>
          <tr>
            <td>Periondotia</td>
          </tr>
          <tr>
            <td>Cirurgia </td>
          </tr>
          <tr>
            <td>Endodontia</td>
          </tr>
          <tr>
            <td>Radiologia</td>
          </tr>
          <tr>
            <td>Ortodontia</td>
          </tr>
          <tr>
            <td>Prótese</td>
          </tr>
          <tr>
            <td>Prótese Implante (a partir de 30 dias)</td>
          </tr>
        </table>
      </div>
    );
  };

  return <>{selectionScreen ? renderProductList() : renderComparisonList()}</>;
};

export default ProductCompare;
