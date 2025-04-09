import Table from "react-bootstrap/Table";

const TodoTable = () => {
  return (
    <div className="mt-3">
      <Table striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Task 1</td>
            <td>Cleaning the Room</td>
            <td>Completed</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Task 2</td>
            <td>Planting Vegetable</td>
            <td>Pending</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Cook Meal</td>
            <td>Our family dinner</td>
            <td>Completed</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default TodoTable;
