import React from "react";

export default function Pagination({
  itemsPerPage,
  totalItems,
  currentPage,
  setCurrentPage,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    pageNumbers &&
    pageNumbers.length > 0 && (
      <>
        <div className="pagination">
          {pageNumbers.map((no) => (
            <li
              key={no}
              className={`page-item ${no === currentPage ? "active" : ""}`}
            >
              <a onClick={() => setCurrentPage(no)} className="page-link">
                {no}
              </a>
            </li>
          ))}
        </div>
      </>
    )
  );
}
