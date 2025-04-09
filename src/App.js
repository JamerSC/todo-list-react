//import Button from "react-bootstrap/Button";
import TodoNav from "./components/TodoNav";
import TodoModal from "./components/TodoModal";
import TodoTable from "./components/TodoTable";

function App() {
  return (
    <>
      <div className="container">
        <TodoNav />
        <TodoModal />
        <TodoTable />
      </div>
    </>
  );
}

export default App;
