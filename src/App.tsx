import "./App.css";
import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";
import ProductList from "./components/product-list/ProductList";

function App() {
  return (
    <>
      <Header />
      <main>
        {/* render the featured product list */}
        <ProductList />
      </main>
      <Footer />
    </>
  );
}

export default App;
