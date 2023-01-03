import React from "react";
import { useProduct } from "vtex.product-context";
import "./global.css";
interface ProductAvailableProps {
    // children: any;
};

const getSpecs: StorefrontFunctionComponent<ProductAvailableProps> = () => {
    const productInfo = useProduct();
    const specs = productInfo?.product?.properties[0].values;
    console.log(specs)
//verify if bigger than 7 to create 2 sides
 
        return (
         <>
         </>
        );
    };

export default getSpecs;