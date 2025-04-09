import Table from "react-bootstrap/Table";
import { FaEdit } from "react-icons/fa";
import IconButton from "./IconButton";
import { RiDeleteBin6Line } from "react-icons/ri";

const TodoTable = ({ todos, onUpdate, onDelete }) => {
  const todoItems = todos;
  return (
    <Table striped hover className="align-middle mt-3">
      {/* Add class for vertical alignment */}
      <thead>
        <tr>
          {/* <th>#</th> */}
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {todos.length === 0 ? (
          <tr>
            <td colSpan="4" className="text-center">
              No tasks found.
            </td>
          </tr>
        ) : (
          todoItems.map((todo) => (
            <tr key={todo.id}>
              {/* <td>{todo.id}</td> */}
              <td className="align-middle">{todo.title}</td>
              <td className="align-middle">{todo.description}</td>
              <td className="align-middle">{todo.status}</td>
              <td className="text-center">
                {/* Center align buttons */}
                <IconButton
                  icon={FaEdit}
                  color="green"
                  title="Update"
                  onClick={() => {
                    onUpdate(todo); // Update Todo
                  }}
                  // Add some spacing between buttons
                />
                <IconButton
                  icon={RiDeleteBin6Line}
                  color="red"
                  title="Delete"
                  onClick={() => {
                    onDelete(todo.id); // Delete Todo
                  }}
                />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};

export default TodoTable;
