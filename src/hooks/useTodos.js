import { useState, useEffect } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../services/api";

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

  const fetchTodos = async () => {
    try {
      const res = await getTodos({
        page,
        size,
        search: searchTerm,
        status: filterStatus,
      });

      const { content, page: pageInfo } = res.data.data;

      setTodos(content);
      setTotalPages(pageInfo.totalPages);
      setTotalElements(pageInfo.totalElements);
    } catch (err) {
      console.error(err);
    }
  };

  // refetch on change
  useEffect(() => {
    fetchTodos();
  }, [page, searchTerm, filterStatus]);

  const handleSave = async (todo) => {
    if (todo.id) {
      await updateTodo(todo);
    } else {
      await createTodo(todo);
    }
    fetchTodos();
    setCurrentTodo(null);
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

    // pagination
    page,
    setPage,
    totalPages,
    totalElements,
  };
}
