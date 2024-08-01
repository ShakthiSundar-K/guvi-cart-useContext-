// ProductContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      if (res.status === 200) {
        setProducts(
          res.data.map((product) => ({
            ...product,
            quantity: 1,
          }))
        );
      }
    } catch {}
  };

  useEffect(() => {
    getData();
  }, []);

  const removeFromCart = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setProducts(
      products.map((product) =>
        product.id === productId
          ? { ...product, quantity: Math.max(1, parseInt(newQuantity, 10)) }
          : product
      )
    );
  };

  const calculateTotalPrice = () => {
    return products
      .reduce((total, product) => {
        const price = parseFloat(product.price) || 0;
        const quantity = parseInt(product.quantity, 10) || 1;
        return total + price * quantity;
      }, 0)
      .toFixed(2);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        removeFromCart,
        handleQuantityChange,
        calculateTotalPrice,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
