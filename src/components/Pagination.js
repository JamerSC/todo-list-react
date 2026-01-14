import Pagination from "react-bootstrap/Pagination";

const TodoPagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <Pagination className="justify-content-center mt-3">
      <Pagination.Prev
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
      />

      {[...Array(totalPages)].map((_, i) => (
        <Pagination.Item
          key={i}
          active={i === page}
          onClick={() => onPageChange(i)}
        >
          {i + 1}
        </Pagination.Item>
      ))}

      <Pagination.Next
        disabled={page === totalPages - 1}
        onClick={() => onPageChange(page + 1)}
      />
    </Pagination>
  );
};

export default TodoPagination;
