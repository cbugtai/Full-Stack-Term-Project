import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Landing from "./components/pages/landing/Landing";
import { WishProducts } from "./components/pages/product/WishProducts";

import Sellers from "./components/pages/sellers/Sellers";

import { useState } from "react";
import { productData } from "./components/common/product-list/sample-data/sample-data";
import type { Product } from "./components/common/product-list/sample-data/sample-data";
import Page3 from "./components/pages/nick's page/Dashboard";
import { SellersFavorites } from "./components/pages/sellers/favorites/FavoriteSellers";
import { SellersBlocked } from "./components/pages/sellers/blocked/BlockedSellers";

function App() {
  const [products, updateProducts] = useState<Product[]>(productData);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Landing products={products} updateProducts={updateProducts} />
          }
        />

        {/* Casper's Routes */}
        <Route path="/wishlist">
          <Route
            index
            element={
              <WishProducts
                products={products}
                updateProducts={updateProducts}
              />
            }
          />
        </Route>

        {/* Christian's Routes (work in progress) */}
        <Route path="/sellers">
          <Route index element={
            <Sellers />} />

          <Route path="favorite-sellers" element={
            <SellersFavorites />} />

          <Route path="blocked-sellers" element={
            <SellersBlocked />} />

          {/*
          <Route path="/profiles">
            <Route index element={<h1>404 Not Found</h1>} />

            <Route path=":sellerId" element={<SellerProfile />} />
          */}
        </Route>

        {/* Nick's Routes */}
        <Route path="/dashboard">
          <Route index element={<Page3 />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
