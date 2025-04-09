import { useState } from "react";
import TodoNav from "./components/TodoNavBar";
import TodoModal from "./components/TodoFormModal";
import TodoTable from "./components/TodoTable";

function App() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = (todo) => {
    //console.log(todo);
    setTodos((todos) => [...todos, todo]);
  };
  return (
    <>
      <div className="container">
        <TodoNav />
        <TodoModal onCreateTodo={handleAddTodo} />
        <TodoTable todoItems={todos} />
      </div>
    </>
  );
}

export default App;
