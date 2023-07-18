import axios from "axios";
import Products from "./../components/products";
import React, { useEffect, useState } from "react";

const HomePage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("/products").then((response) => { setProducts(response.data)});
    },[]);

  return (
    <div className="products">
      <Products products={products}></Products>
    </div>
  );
};

export default HomePage;
