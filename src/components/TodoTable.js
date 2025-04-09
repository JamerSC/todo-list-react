import Table from "react-bootstrap/Table";

const TodoTable = ({ todoItems }) => {
  const todos = todoItems;
  return (
    <div className="mt-3">
      <Table striped hover>
        <thead>
          <tr>
            {/* <th>#</th> */}
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              {/* <td>{todo.id}</td> */}
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>{todo.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TodoTable;
