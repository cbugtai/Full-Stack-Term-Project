import "./App.css";
import ProductList from "./components/product-list/ProductList";
import TopSellers from "./components/top-sellers/TopSellers";

function App() {
  return (
    <>
      <main>
        {/* render the featured product list */}
        <ProductList />
        {/* render list of sellers with descending reputation */}
        <TopSellers/>
      </main>
    </>
  );
}

export default App;
