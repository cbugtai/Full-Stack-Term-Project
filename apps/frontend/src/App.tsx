import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Landing from "./components/pages/landing/Landing";
import { WishProducts } from "./components/pages/product/WishProducts";

import Sellers from "./components/pages/sellers/Sellers";

import { SellersFavorites } from "./components/pages/sellers/favorites/FavoriteSellers";
import { SellersBlocked } from "./components/pages/sellers/blocked/BlockedSellers";

import { Dashboard } from "./components/pages/dashboard/Dashboard";
import { DefaultDisplay } from "./components/pages/dashboard/display/defaultDisplay/DefaultDisplay";
import { Settings } from "./components/pages/dashboard/display/settings/Settings";
import { ProfilePage } from "./components/pages/dashboard/display/settings/profilePage/ProfilePage";
import { ProfileInfoPage } from "./components/pages/dashboard/display/settings/profileInfo/ProfileInfo";
import { Listings } from "./components/pages/dashboard/display/listings/Listings";
import { CurrentListings } from "./components/pages/dashboard/display/listings/currentListings/CurrentListings";
import SignInPage from "./components/pages/signInPage/SignInPage";
import { RequireAuth } from "./components/auth/RequireAuth";

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />

        {/* Casper's Routes */}
        <Route path="/wishlist">
          <Route index element={<WishProducts />} />
        </Route>

        {/* Christian's Routes */}
        <Route path="/sellers">
          <Route index element={<Sellers />} />

          <Route path="favorite-sellers" 
            element={
            <RequireAuth>
              <SellersFavorites />
            </RequireAuth>
          } />

          <Route path="blocked-sellers" 
            element={
            <RequireAuth>
              <SellersBlocked />
            </RequireAuth>
          } />
        </Route>

        {/* Nick's Routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DefaultDisplay />} />
          <Route path="settings" element={<Settings />} />
          <Route path="settings/profile/*" element={<ProfilePage />} />
          <Route path="settings/profile-info/*" element={<ProfileInfoPage />} />
          <Route path="listings" element={<Listings />} />
          <Route path="listings/current" element={<CurrentListings />} />
        </Route>

        <Route path="/sign-in/*" element={<SignInPage />} />
      </Route>
    </Routes>
  );
}

export default App;
