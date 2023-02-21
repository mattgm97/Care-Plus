import React, {useState}from "react";
import "./global.css";
interface StorefrontFunctionComponentAvailableProps {
    productName: string;
    productPrice:number;
    addSelectedItem:Function;
    RemoveSelectedItem:Function;
    selectedProd:boolean
}

const ProductCard: StorefrontFunctionComponent<StorefrontFunctionComponentAvailableProps> = ({productName, productPrice, addSelectedItem, RemoveSelectedItem, selectedProd }) => {

   

    const onSelectItem = ()=>{
        if(selectedProd){
            RemoveSelectedItem()
        } else{
            addSelectedItem()
        }
        
    }

    let mainTitle = "";
    let properName = "";
    let price = productPrice.toFixed(2).toString().replace(".", ",");

    if(productName.includes("Dental Pro10")){
        mainTitle = "Dental Pro10";
        properName = productName.split("Dental Pro10 ")[1]

    }else if(productName.includes("Dental Pro20")){
        mainTitle = "Dental Pro20"
        properName = productName.split("Dental Pro20 ")[1]

    } else if(productName.includes("Dental Lite")){
        mainTitle = "Dental Lite"
        properName = productName.split("Dental Lite ")[1]
    }

  return (
  <div className={`prodBlock ${selectedProd? "selected": ""}`} onClick={onSelectItem}>
    <div className="name">
        <p className="mainTitle">
            {mainTitle}
        </p>
        <p className="properName">
            {properName}
        </p>
        </div>
        <div className="price">
            
        <span>
        {price}
        </span>
        </div>
  </ div>
  );
};

export default ProductCard;
