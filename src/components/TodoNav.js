import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const TodoNav = () => {
  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand href="#home">Todo List</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Task</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Profile</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default TodoNav;
