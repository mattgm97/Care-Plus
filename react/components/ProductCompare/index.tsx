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

  const onSelectItem = (item: any) => {
    if(){}// se nao tem add se ja tem deleta
    //fazer o clean all chamar essa funcao com um parametro a mais pra limpar tudo
    setProductsSelected(item);
  };
  const renderProductList = () => {
    return (
      <div className="selectorField">
      <ul>
        {productsAvailable.map((element) => {
          return (
            <li key={element.productId}>
              <ProductCard
                productName={element.productName}
                productPrice={element.priceRange.sellingPrice.highPrice}
                addSelectedItem={() =>
                  onSelectItem({
                    name: element.productName,
                    price: element.priceRange.listPrice,
                    specs: element.properties[0].values,
                  })
                }
                RemoveSelectedItem={() =>
                  onSelectItem({
                    name: element.productName,
                    price: element.priceRange.listPrice,
                    specs: element.properties[0].values,
                  })
                }
              />
            </li>
          );
        })}
      </ul>

      <span className="cleanAll" onClick={()=>setProductsSelected([])}>Desmarcar todos os itens</span>
      </div>
    );
  };

  return <>{selectionScreen && renderProductList()}</>;
};

export default ProductCompare;
