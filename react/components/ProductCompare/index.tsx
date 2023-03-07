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
  const caracteristicas = [
   /* "Múltiplo Reembolso",
    "Valor de Reembolso da Consulta",
    "Care Plus Clinic",*/
    "Clareamento dentário",
    "Clínica Geral / Diagnóstico",
    "Urgência e Emergência",
    "Prevenção",
    "Odontopediatria",
    /*"Pacientes Especiais",*/
    "Dentística",
    "Periodontia",
    "Cirurgia",
    "Endodontia",
    "Radiologia",
    "Ortodontia",
    "Prótese"/*,
    "Implante (a partir de 30 dias)"*/
  ];

  const sortProds = (a:any, b:any)=>{
    if (a.priceRange.sellingPrice.highPrice > b.priceRange.sellingPrice.highPrice) {
      return 1;
    }
    if (a.priceRange.sellingPrice.highPrice < b.priceRange.sellingPrice.highPrice) {
      return -1;
    }
    // a must be equal to b
    return 0;
  }

  useEffect(() => {
    fetch("/api/io/_v/api/intelligent-search/product_search")
      .then((res) => {
        return res.json();
      })
      .then((r) => {

        r.products.sort(sortProds)

        setProductsAvailable(r.products);
      });
  }, []);



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

  productsSelected.sort((a:any, b:any)=>{
      if (a.price > b.price) {
        return 1;
      }
      if (a.price < b.price) {
        return -1;
      }
      // a must be equal to b
      return 0;
    })
    
    return (
      <div className="selectorField">
        <ul>
          {
          productsAvailable.map((element) => {
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

<div className="cleanAllDiv">
<span className="cleanAll" onClick={() => setProductsSelected([])}>
          Desmarcar todos os itens
        </span>
</div>
        

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
              let whatColor = "";

              if (element.name.includes("Dental Pro10")) {
                mainTitle = "Dental Pro10";
                properName = element.name.split("Dental Pro10 ")[1];
                whatColor = "pro"
              } else if (element.name.includes("Dental Pro20")) {
                mainTitle = "Dental Pro20";
                properName = element.name.split("Dental Pro20 ")[1];
                whatColor = "pro"
              } else if (element.name.includes("Dental Lite")) {
                mainTitle = "Dental Lite";
                properName = element.name.split("Dental Lite ")[1];
                whatColor = "lite"
              }
              return (
                <th>
                  <span className="title-header">
                    {mainTitle} {properName == undefined ? "" : "+"}
                  </span>
                  <span className="title-header-secondary">{properName}</span>
                  <span className={`price-header ${whatColor}`}>{element.price} </span>
                  <span className={`mensalidade-header ${whatColor}`}>por mês</span>
                  <a
                    className="linkProduct-header"
                    target="_blank"
                    href={element.link}
                  >
                    Contratar plano
                  </a>
                </th>
              );
            })}
          </tr>

          {
            caracteristicas.map(caracteristica=>{
              return(
                <tr>
                  <td>{caracteristica}</td>
                 { productsSelected.map(element=>{
                 
                  let included = false;
                  
                  element.specs.forEach((el:any)=>{
                    if(caracteristica.includes(el)){
                      included = true
                    }
                  })
                  if(included){
                    return(<td><img src="/arquivos/ok-verde.svg"/></td>)
                  } else{
                    return(<td><img src="/arquivos/doesntHave.svg"/></td>)
                  }
                 })}
                  
                </tr>
              )
            })
          }
          
        </table>
        <button
          className="returnToSelect"
          onClick={() => {
            setSelectionScreen(true);
            setProductsSelected([]);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Comparar outros planos
        </button>

      </div>
    );
  };

  return <>{selectionScreen ? renderProductList() : renderComparisonList()}</>;
};

export default ProductCompare;
