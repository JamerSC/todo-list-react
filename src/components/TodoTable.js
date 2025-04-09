import Table from "react-bootstrap/Table";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import IconButton from "./IconButton";

const TodoTable = ({ todoItems }) => {
  const todos = todoItems;
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
        {todos.map((todo) => (
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
                title="Edit"
                className="mx-2" // Add some spacing between buttons
              />
              <IconButton icon={MdDeleteForever} color="red" title="Delete" />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TodoTable;
