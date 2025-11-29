import "./ProductPagination.css";
import { useState } from "react";

function ProductPagination({
  pageInit = 1,
  pageSizeInit = 10,
  getPaginationList = () => {},
}) {
  const [page, setPage] = useState(pageInit);
  const [pageSize, setPageSize] = useState(pageSizeInit);

  return (
    <div className="product-pagination">
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Prev
      </button>

      <span> Page {page} </span>

      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}

export default ProductPagination;
