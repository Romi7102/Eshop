import axios from "axios";
import Products from "../../components/Products/products";
import React, { useEffect, useState } from "react";
import MessageBox from "../../components/MessageBox/messageBox";
import Loading from "../../components/Loading/loading";

import "./homePage.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <>
    <div>
        <MessageBox variant="danger">Be carefull</MessageBox>
        <Loading></Loading>
    </div>
      <div className="products">
        <h1 className="title">Products</h1>
        <Products products={products}></Products>
      </div>
    </>
  );
};

export default HomePage;
