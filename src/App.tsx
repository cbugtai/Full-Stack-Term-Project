import "./App.css";
import Header from "./components/common/layout/header/Header";
import Footer from "./components/common/layout/footer/Footer";
import ProductList from "./components/pages/landing/product-list/ProductList";
import TopSellers from "./components/pages/landing/top-sellers/TopSellers";
import Testimonials from "./components/pages/landing/testimonials/testimonials";

function App() {
  return (
    <>
      <Header />
      <main>
        {/* render the featured product list */}
        <ProductList />
        {/* render list of sellers with descending reputation */}
        <TopSellers />
        {/* render the testimonial slider */}
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}

export default App;
