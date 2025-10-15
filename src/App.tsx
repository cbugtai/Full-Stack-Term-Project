import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Landing from "./components/pages/landing/Landing";
import { WishProducts } from "./components/pages/product/WishProducts";
import Sellers from "./components/pages/sellers/Sellers";
import sellerData from "@/data/sellers_list.json";
import type { Seller } from "@/types/sellerModel";

import { useState } from "react";
import { productData } from "./components/common/product-list/sample-data/sample-data";
import type { Product } from "./components/common/product-list/sample-data/sample-data";
import { SellersFavorites } from "./components/pages/sellers/favorites/FavoriteSellers";
import { SellersBlocked } from "./components/pages/sellers/blocked/BlockedSellers";

import { Dashboard } from "./components/pages/dashboard/Dashboard";
import { DefaultDisplay } from "./components/pages/dashboard/display/defaultDisplay/DefaultDisplay";
import { ChangeUsername } from "./components/pages/dashboard/display/settings/changeUsername/ChangeUsername";
import { ChangePassword } from "./components/pages/dashboard/display/settings/changePassword/ChangePassword";
import { ChangeProfilePicture } from "./components/pages/dashboard/display/settings/changeProfilePicture/ChangeProfilePic";
import { EditBio } from "./components/pages/dashboard/display/settings/editBio/EditBio";
import { ManageContact } from "./components/pages/dashboard/display/settings/manageContact/ManageContact";
import { DeleteAccount } from "./components/pages/dashboard/display/settings/deleteAccount/DeleteAccount";


function App() {
  const [products, updateProducts] = useState<Product[]>(productData);
  const [sellers, setSellers] = useState<Seller[]>(sellerData);

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
            <Sellers 
              sellers={sellers} 
              setSellers={setSellers} 
            />} />

          <Route path="favorite-sellers" element={
            <SellersFavorites
              sellers={sellers}
              setSellers={setSellers}
            />} />
          <Route path="blocked-sellers" element={
            <SellersBlocked
              sellers={sellers}
              setSellers={setSellers}
            />} />

          {/*
          <Route path="/profiles">
            <Route index element={<h1>404 Not Found</h1>} />

            <Route path=":sellerId" element={<SellerProfile />} />
          */}
        </Route>

        {/* Nick's Routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DefaultDisplay />} />
          <Route path="change-username" element={<ChangeUsername />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="change-profile-picture" element={<ChangeProfilePicture />} />
          <Route path="edit-bio" element={<EditBio />} />
          <Route path="manage-contact" element={<ManageContact />} />
          <Route path="delete-account" element={<DeleteAccount />} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
