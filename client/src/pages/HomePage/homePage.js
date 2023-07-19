import axios from "axios";
import Products from "../../components/Products/products";
import React, { useEffect, useState, useReducer } from "react";
import MessageBox from "../../components/MessageBox/messageBox";
import Loading from "../../components/Loading/loading";
import { HomePageReducer, initState } from "../../Reducers/HomePageReducer";
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from "../../Reducers/Actions";

import "./homePage.css";

const HomePage = () => {
  // const [products, setProducts] = useState([]);
  const [{ loading, error, products }, dispatch] = useReducer(
    HomePageReducer,
    initState
  );

  useEffect(() => {
    const getProducts = async () => {
      dispatch({ type: GET_REQUEST });

      try {
        const res = await axios.get("/products");
        dispatch({ type: GET_SUCCESS, payload: res.data });
      } catch (e) {
        dispatch({ type: GET_FAIL, payload: e.message });
      }
    };
    getProducts();
  }, []);

  return (
    <>
      <h1 className="title">Products</h1>
      <div className="products">
        {loading ? (
          <Loading></Loading>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : null}
        <Products products={products}></Products>
      </div>
    </>
  );
};

export default HomePage;
