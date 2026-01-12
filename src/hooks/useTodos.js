import { useState, useEffect } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../services/api";

export default function useTodos() {
  //const [todos, setTodos] = useState(task); // sample data
  const [todos, setTodos] = useState([]); // empty data []
  const [currentTodo, setCurrentTodo] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Declare a state variable...
  const [filterStatus, setFilterStatus] = useState("");

  // FETCH API - GET ALL
  useEffect(() => {
    getTodos().then(setTodos).catch(console.error);
  }, []);

  // FETCH API - CREATE & UPDATE
  const handleSave = async (todo) => {
    let updated;
    //const exists = todos.find((t) => t.id === todo.id);
    if (todo.id) {
      updated = await updateTodo(todo);
      setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } else {
      updated = await createTodo(todo);
      setTodos((prev) => [...prev, updated]);
    }
    setCurrentTodo(null);
  };

  const handleUpdate = (todo) => {
    console.log(`Updated ID no. ` + todo.id);
    setCurrentTodo(todo);
  };

  // FETCH API - DELETE
  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch =
      todo.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = !filterStatus || todo.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return {
    todos,
    setTodos,
    currentTodo,
    setCurrentTodo,
    searchTerm,
    setSearchTerm,
    handleSave,
    handleUpdate,
    handleDelete,
    filteredTodos,
    filterStatus,
    setFilterStatus,
  };
}
