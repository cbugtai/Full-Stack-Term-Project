import "./ProductPagination.css";
import type { PaginationParams } from "@/types/productModel";

function ProductPagination({ page, maxPage, setPage }: PaginationParams) {
  return (
    <div className="product-pagination">
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Prev
      </button>

      <span>
        {" "}
        Page {page} / {maxPage}
      </span>

      <button onClick={() => setPage(page + 1)} disabled={page === maxPage}>
        Next
      </button>
    </div>
  );
}

export default ProductPagination;
