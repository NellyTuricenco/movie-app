//import from other libraries
import clsx from "clsx";

//import of the components
import { usePagination, dots } from "./usePagination";

//import for styles
import style from "./Pagination.module.scss";

export const Pagination = ({
  handlePageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  limit,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    limit,
  });

  // If there are less than 2 pages in pagination range we do not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const next = () => {
    handlePageChange(currentPage + 1);
  };

  const prev = () => {
    handlePageChange(currentPage - 1);
  };
  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className={style.container}>
      {/* Left arrow */}
      <li
        className={clsx(style.item, currentPage === 1 ? style.disabled : "")}
        onClick={prev}
      >
        <div className={clsx(style.arrow, style.arrow__left)} />
      </li>
      {paginationRange.map((pageNumber, index) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === dots) {
          return (
            <li className={clsx(style.item, style.dots)} key={index}>
              &#8230;
            </li>
          );
        }

        // Render our Page Pills
        return (
          <li
            key={index}
            className={clsx(
              style.item,
              pageNumber === currentPage ? style.selected : ""
            )}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}

      {/*  Right arrow */}
      <li
        className={clsx(
          style.item,
          currentPage === lastPage ? style.disabled : ""
        )}
        onClick={next}
      >
        <div className={clsx(style.arrow, style.arrow__right)} />
      </li>
    </ul>
  );
};
export default Pagination;
