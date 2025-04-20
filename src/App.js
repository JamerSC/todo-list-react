import { useState } from "react";
import TodoNav from "./components/TodoNavBar";
import TodoModal from "./components/TodoFormModal";
import TodoTable from "./components/TodoTable";
import { task } from "./components/data";
import SearchBar from "./components/SearchBar";

function App() {
  const [todos, setTodos] = useState(task); // sample data
  // const [todos, setTodos] = useState([]); // empty data []
  const [currentTodo, setCurrentTodo] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Declare a state variable...

  const handleSave = (todo) => {
    const exists = todos.find((t) => t.id === todo.id); // checking if todo.id exists

    if (exists) {
      setTodos(todos.map((t) => (t.id === todo.id ? { ...t, ...todo } : t)));
      console.log(`Updated task: ${todo.id}`);
    } else {
      setTodos((todos) => [...todos, todo]);
      console.log("Created new task:", todo);
    }
    // setShowModal(false);
    setCurrentTodo(null);
  };

  const handleUpdate = (todo) => {
    console.log(`Updated ID no. ` + todo.id);
    setCurrentTodo(todo);
  };

  const handleDelete = (id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
    console.log(`Deleted ID No. ` + id);
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
