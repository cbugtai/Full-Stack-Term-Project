import "./App.css";
import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";
import NavBar from "./components/nav/NavBar";
import ProductList from "./components/product-list/ProductList";

function App() {
  return (
    <>
      <Header />
      <main>
        <NavBar />
        {/* render the featured product list */}
        <ProductList />
      </main>
      <Footer />
    </>
  );
}

export default App;
