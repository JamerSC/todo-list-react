import { useState, useEffect, useCallback } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../services/api";
import { mapFieldErrors } from "../utils/apiErrorMapper";

export default function useTodos() {
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // pagination state
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const [apiError, setApiError] = useState(null);

  const fetchTodos = useCallback(async () => {
    try {
      const res = await getTodos({
        page,
        size,
        search: searchTerm,
        status: filterStatus,
      });
      const pageData = res.data.data;
      setTodos(pageData.content);
      setTotalPages(pageData.totalPages);
      setTotalElements(pageData.totalElements);
    } catch (err) {
      console.error("Failed to fetch todos:", err);
    }
  }, [page, size, searchTerm, filterStatus]); // fetchTodos depends on these

  // Then your effect:
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]); // ✅ only depends on stable callback

  // reset page on filter/search
  useEffect(() => {
    setPage(0);
  }, [searchTerm, filterStatus]);

  const handleSave = async (todo) => {
    setApiError(null);

    try {
      if (todo.id) await updateTodo(todo);
      else await createTodo(todo);

      fetchTodos();
      setCurrentTodo(null);
      return true; // ✅ success
    } catch (errorData) {
      setApiError({
        message: errorData.message || "Validation failed",
        fieldErrors: mapFieldErrors(errorData),
      });
      return false;
    }
  };

  const handleUpdate = (todo) => {
    setCurrentTodo(todo);
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    fetchTodos();
  };
  return {
    todos,
    currentTodo,
    setCurrentTodo,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    handleSave,
    handleUpdate,
    handleDelete,

    apiError,
    setApiError,
    // pagination
    page,
    setPage,
    totalPages,
    totalElements,
  };
}
