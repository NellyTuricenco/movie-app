import { useMemo } from "react";

export const dots = "...";

const range = (start, end) => {
  let length = end - start + 1;
  //	Create an array of certain length and set the elements within it from start value to end value.
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
  totalCount,
  limit,
  siblingCount = 1,
  currentPage,
}) => {
  const paginationRange = useMemo(() => {
    //total number of pages = the total number of the data elements / limit of elements per page
    const totalPageCount = Math.ceil(totalCount / limit);

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    //CASE: 1
    //if number of pages is less than we want to show in Pagination, then we return the range [1...totalPageCount]
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }
    //Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    //We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    //CASE: 2
    //To show only right dots
    if (!showLeftDots && showRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, dots, totalPageCount];
    }

    //CASE: 3
    //To show only left dots
    if (showLeftDots && !showRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, dots, ...rightRange];
    }
    //CASE:4
    //Both left and right dots to be shown
    if (showLeftDots && showRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, dots, ...middleRange, dots, lastPageIndex];
    }
  }, [totalCount, limit, siblingCount, currentPage]);
  return paginationRange;
};
