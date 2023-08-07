import React, { useEffect, useReducer, useState } from "react";
import { searchPageReducer, prices, ratings } from "./Utills";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from "../../Reducers/Actions";
import { getFilterUrl } from "../../Services/GetFilterUrl";
import Title from "../../components/Title/Title";
import { Button, Col, Row } from "react-bootstrap";
import "./searchPage.css";
import Rating from "../../components/Rating/rating";
import Loading from "../../components/Loading/loading";
import MassageBox from "../../components/MessageBox/messageBox";
import Product from "../../components/Product/product";
import { LinkContainer } from "react-router-bootstrap";

const SearchPage = () => {
  const [{ loading, error, products, pages, productsCount }, dispatch] =
    useReducer(searchPageReducer, {
      loading: true,
      error: "",
    });

  const errSettings = {
    theme: "colored",
    hideProgressBar: true,
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  };

  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const category = searchParams.get("category") || "all";
  const query = searchParams.get("query") || "all";
  const price = searchParams.get("price") || "all";
  const rating = searchParams.get("rating") || "all";
  const order = searchParams.get("order") || "newest";
  const page = searchParams.get("page") || 1;

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await axios.get("/products/categories");
        setCategories(data);
      } catch (error) {
        toast.error(error.message, errSettings);
      }
    };
    getCategories();
    console.log(categories);
  }, []);

  useEffect(() => {
    const getData = async () => {
      dispatch({ type: GET_REQUEST });
      try {
        const { data } = await axios.get(
          "/products/search?" + getFilterUrl(search, {}, true)
        );
        dispatch({ type: GET_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: GET_FAIL, payload: error.message });
      }
    };
    getData();
    console.log(products);
  }, [category, order, page, price, query, rating]);

  return (
    <div>
      <Title>Search</Title>
      <Row>
        <Col md={3}>
          <h3>Category</h3>
          <div>
            <ul>
              <li>
                <Link
                  className={"all" === category ? "text-bold" : ""}
                  to={getFilterUrl(search, { category: "all" })}
                >
                  Any
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c}>
                  <Link
                    className={c === category ? "text-bold" : ""}
                    to={getFilterUrl(search, { category: c })}
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Prices</h3>
            <ul>
              {prices.map((p) => (
                <li key={p.name}>
                  <Link
                    className={p.value === price ? "text-bold" : ""}
                    to={getFilterUrl(search, { price: p.value })}
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Rating</h3>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link
                    className={r.value === rating ? "stars-color" : ""}
                    to={getFilterUrl(search, { rating: r.value })}
                  >
                    <Rating rating={r.value} caption=" "></Rating>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Col md={9}>
          {loading ? (
            <Loading />
          ) : error ? (
            <MassageBox variant="danger">{error.message}</MassageBox>
          ) : (
            <>
              <Row className="justify-content-between md-3">
                <Col md={6}>
                  <div>
                    {productsCount === 0 ? "No " : productsCount + " "}
                    Results
                    {query !== "all" && " : " + query}
                    {category !== "all" && " : " + category}
                    {price !== "all" && " : " + price}
                    {rating !== "all" && " : " + rating + "& Up"}
                    {query !== "all" ||
                    category !== "all" ||
                    price !== "all" ||
                    rating !== "all" ? (
                      <Button
                        variant="light"
                        onClick={() => navigate("/search")}
                      >
                        <i className="fas fa-times-circle"></i>
                      </Button>
                    ) : null}
                  </div>
                </Col>
                <Col className="text-end">
                  Sort By{" "}
                  <select
                    value={order}
                    onChange={(e) =>
                      navigate(
                        getFilterUrl(search, {
                          order: e.target.value,
                        })
                      )
                    }
                  >
                    <option value="newest">Newest Arrivals</option>
                    <option value="lowest">Price: Low to High</option>
                    <option value="highest">Price: High to Low</option>
                    <option value="toprated">Customer Reviews</option>
                  </select>
                </Col>
              </Row>
              {products.length === 0 && <MassageBox>No Product Found!</MassageBox>}
              <Row>
                {console.log(products)}
                {products.map((p) => (
                  <Col sm={6} lg={4} mb={3} key={p._id}>
                    <Product product={p} />
                  </Col>
                ))}
              </Row>
              <div>
                {[...Array(pages).keys()].map((p) => (
                  <LinkContainer
                    key={p + 1}
                    className="mx-1"
                    to={{
                      pathname: "/search",
                      search: getFilterUrl(search, { page: p + 1 }, true),
                    }}
                  >
                    <Button
                      className={Number(page) === p + 1 ? "current-page" : ""}
                      variant="light"
                    >
                      {p + 1}
                    </Button>
                  </LinkContainer>
                ))}
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default SearchPage;
