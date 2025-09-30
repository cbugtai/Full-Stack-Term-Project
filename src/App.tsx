import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Landing from "./components/pages/landing/Landing";
import Page1 from "./components/pages/casper's page/Page1";
import Sellers from "./components/pages/sellers/Sellers";
import Page3 from "./components/pages/nick's page/Page3";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<Landing />} />

        {/* Casper's Routes */}
        <Route path="/page1">
          <Route index element={<Page1 />} />
        </Route>

        {/* Christian's Routes (work in progress) */}
        <Route path="/sellers">
          <Route index element={<Sellers />} />
        {/*
          <Route path="/favorites" element={<FavoriteSellers />} />
          <Route path="/blocked" element={<BlockedSellers />} />

          <Route path="/profiles">
            <Route index element={<h1>404 Not Found</h1>} />

            <Route path=":sellerId" element={<SellerProfile />} />
        */}
        </Route>

        {/* Nick's Routes */}
        <Route path="/page3">
          <Route index element={<Page3 />} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;