import { useState } from "react";
import TodoNav from "./components/TodoNavBar";
import TodoModal from "./components/TodoFormModal";
import TodoTable from "./components/TodoTable";
import { todoItems } from "./components/Data";

function App() {
  const [todos, setTodos] = useState([todoItems]); // sample data
  // const [todos, setTodos] = useState([]); // empty data []
  const [currentTodo, setCurrentTodo] = useState(null);

  const handleSave = (todo) => {
    const exists = todos.find((t) => t.id === todo.id); // checking if todo.id exists

    if (exists) {
      setTodos(todos.map((t) => (t.id === todo.id ? { ...t, ...todo } : t)));
      console.log(`Updated task: ${todo.id}`);
    } else {
      setTodos((todos) => [...todos, todo]);
      console.log(`Created new task: ${todo.id}`);
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

  return (
    <>
      <div className="container">
        <TodoNav />
        <TodoModal
          onSave={handleSave}
          onClose={() => setCurrentTodo(null)}
          todo={currentTodo}
        />
        <TodoTable
          todos={todos}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
}

export default App;
