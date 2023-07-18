import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../Rating/rating";
import "./product.css";

const Product = ({product}) => {
  const addToCartHandler = (product) => {
    console.log(product);
  };

  return (
    <>
      <Card className="product-card">
        <Link to={`/product/${product.token}`}>
          <Card.Img
            variant="top"
            src={product.image}
            alt={product.title}
            className="card-image-page"
          />
          <Card.Body className="card-body">
            <Card.Title className="text-shortner">{product.title}</Card.Title>
            <Rating
              rating={product.rating.rate}
              numReviews={product.rating.count}
            ></Rating>
            <Card.Text>{product.price}$</Card.Text>
            {product.countInStock === 0 ? (
              <Button variant="light" disable>
                Out of stock
              </Button>
            ) : (
              <Button
                className="btn-primary"
                onClick={addToCartHandler(product)}
              >
                Add To Cart
              </Button>
            )}
          </Card.Body>
        </Link>
      </Card>
    </>
  );
};

export default Product;
