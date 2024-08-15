export interface PaginationProps {
  totalPages: number;
  page: number;
  setPage: (page: number) => void;
  size: number;
}
