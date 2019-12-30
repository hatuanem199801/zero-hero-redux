import React from "react";

const ProductItem = ({ product, onClick }) => (
  <div className="product mb-2">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">
          <strong>${product.price}</strong>
        </p>
        <a href="#!" onClick={() => onClick(product)} className="card-link">
          add to cart
        </a>
      </div>
    </div>
  </div>
);

export default ProductItem;
