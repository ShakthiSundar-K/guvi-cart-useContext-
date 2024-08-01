// App.js
import React from "react";
import { ProductProvider } from "./context/ProductContext";
import Card from "./components/Card";

function App() {
  return (
    <ProductProvider>
      <Card />
    </ProductProvider>
  );
}

export default App;
