import ProductList from "./product-list/ProductList";
import TopSellers from "./top-sellers/TopSellers";
import Testimonials from "./testimonials/testimonials";

function Landing() {
    return(
    <main>
        {/* render the featured product list */}
        <ProductList />
        {/* render list of sellers with descending reputation */}
        <TopSellers />
        {/* render the testimonial slider */}
        <Testimonials />
      </main>
    );
}

export default Landing;
