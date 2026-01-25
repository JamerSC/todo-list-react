import { useState, useEffect, useCallback } from "react";
import {
  getTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} from "../services/api";
import { mapFieldErrors } from "../utils/apiErrorMapper";
import { toast } from "react-toastify";
import { TODO_TOAST_IDS } from "../utils/todoToastIds";

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
      toast.error("Failed to fetch todos:", err);
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
      let res;
      if (todo.id) {
        res = await updateTodo(todo);
        // toast notif
        toast.success(res.data?.message || "Todo updated successfully!", {
          todoToastIds: TODO_TOAST_IDS.TODO_UPDATE,
        });
      } else {
        res = await createTodo(todo);
        toast.success(res.data?.message || "Todo created successfully!", {
          todoToastIds: TODO_TOAST_IDS.TODO_CREATE,
        });
      }

      fetchTodos();
      setCurrentTodo(null);
      return true; // ✅ success
    } catch (e) {
      setApiError({
        message: e.message || "Validation failed",
        fieldErrors: mapFieldErrors(e),
      });
      toast.error(e.message || "Something went wrong!", {
        todoToastIds: TODO_TOAST_IDS.TODO_ERROR,
      });
      return false;
    }
  };

  // const handleUpdate = (todo) => {
  //   setCurrentTodo(todo);
  // };

  const handleUpdate = async (id) => {
    try {
      const res = await getTodo(id);
      setCurrentTodo(res.data.data);
    } catch (error) {
      toast.error("Failed to load todo details", {
        toastId: TODO_TOAST_IDS.TODO_ERROR,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteTodo(id);
      toast.success(res.data?.message, {
        todoToastIds: TODO_TOAST_IDS.TODO_DELETE,
      });
      fetchTodos();
    } catch (error) {
      toast.error("Failed to delete todo!", {
        todoToastIds: TODO_TOAST_IDS.TODO_ERROR,
      });
    }
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
