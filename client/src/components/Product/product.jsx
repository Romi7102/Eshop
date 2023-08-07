import React, {useContext} from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../Rating/rating";
import "./product.css";
import { AddToCartHandler } from "../../Services/AddToCart";
import { Store } from "../../Context/Store";

const Product = ({ product }) => {
  const { state, dispatch: contextDispatch } = useContext(Store);
  const { cart: {cartItems} } = state;

  return (
    <>
      <Card className="product-card">
        <Link to={`/product/${product.token}`}>
          <Card.Img
            variant="top"
            src={product.image}
            alt={product.title}
            className="card-image-page"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src =
                "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png";
            }}
          />
        </Link>
        <Card.Body className="card-body">
          <Link to={`/product/${product.token}`}>
            <Card.Title className="text-shortner">{product.title}</Card.Title>
          </Link>
          <Rating
            rating={product.rating.rate}
            numReviews={product.rating.count}
          ></Rating>
          <Card.Text>{product.price}$</Card.Text>
          {product.countInStock === 0 ? (
            <Button variant="light" disabled>
              Out of stock
            </Button>
          ) : (
            <Button className="btn-primary" onClick={()=>AddToCartHandler(product, cartItems, contextDispatch)}>
              Add To Cart
            </Button>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default Product;
