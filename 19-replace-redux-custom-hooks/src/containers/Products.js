import React, { useContext } from "react";

import ProductItem from "../components/Products/ProductItem";
// import { ProductsContext } from "../context/products-context";
import { useStore } from "../hooks-store/store";
import "./Products.css";

const Products = (props) => {
  // const productList = useContext(ProductsContext).products; // Context je {products: productsList}

  const [state, dispatch] = useStore(); // state - tap into global state; dispatch - dispatch an action

  return (
    <ul className="products-list">
      {state.products.map((prod) => (
        <ProductItem
          key={prod.id}
          id={prod.id}
          title={prod.title}
          description={prod.description}
          isFav={prod.isFavorite}
        />
      ))}
    </ul>
  );
};

export default Products;
