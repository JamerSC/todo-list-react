import { useEffect, useState } from "react";
import TodoNav from "./components/TodoNavBar";
import TodoModal from "./components/TodoFormModal";
import TodoTable from "./components/TodoTable";
import SearchBar from "./components/SearchBar";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./services/api";

function App() {
  //const [todos, setTodos] = useState(task); // sample data
  const [todos, setTodos] = useState([]); // empty data []
  const [currentTodo, setCurrentTodo] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Declare a state variable...

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

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLocaleLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="container mt-4">
        <TodoNav />
        <div className="d-flex justify-content-between align-items-center my-3 flex-wrap gap-3">
          <TodoModal
            onSave={handleSave}
            onClose={() => setCurrentTodo(null)}
            todo={currentTodo}
          />
          <div className="ms-auto w-40">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
        </div>
        <TodoTable
          todos={filteredTodos}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
}

export default App;
