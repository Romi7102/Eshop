import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../Product/product";
import './products.css'
const Products = ({ products = [] }) => {
  return (
    <>
      <Row>
        {products.map((product) => (
          <Col key={product.token} lg={3} md={4} sm={6} className="mb-3">
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Products;
