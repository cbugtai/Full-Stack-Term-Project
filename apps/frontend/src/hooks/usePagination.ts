import { useState } from "react";

export function usePagination(pageSizePara: number) {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const pageSize = pageSizePara;
  return { page, setPage, maxPage, setMaxPage, pageSize };
}
