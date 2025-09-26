import "./App.css";
import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";
import ProductList from "./components/product-list/ProductList";
import TopSellers from "./components/top-sellers/TopSellers";
import Testimonials from "./components/testimonials/testimonials";

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
