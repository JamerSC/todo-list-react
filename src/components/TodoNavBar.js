import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const TodoNav = () => {
  return (
    <>
      <Navbar bg="light" className="mb-3">
        <Container>
          <Navbar.Brand href="#task">
            <h4>Todo List</h4>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#dashboard">Dashboard</Nav.Link>
            <Nav.Link href="#task">Task</Nav.Link>
            <Nav.Link href="#pricing">Profile</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default TodoNav;
