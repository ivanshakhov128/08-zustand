import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={currentPage - 1}
      onPageChange={(selected) => onPageChange(selected.selected + 1)}
      containerClassName={css.pagination}
      pageClassName={css.page}
      activeClassName={css.active}
      previousLabel={"<"}
      nextLabel={">"}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
    />
  );
}
