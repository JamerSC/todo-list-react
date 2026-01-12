import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomButton from "./Button";
import { FaPlus } from "react-icons/fa";

const TodoModal = ({ todo, onSave, onClose }) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const handleClose = () => {
    setShow(false);
    setTitle("");
    setDescription("");
    setStatus("");
    if (onClose) onClose(); // null the current todo
  };

  const handleShow = () => setShow(true);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title || "");
      setDescription(todo.description || "");
      setStatus(todo.status || "");
      setShow(true); // Automatically open modal when editing
    }
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !status) {
      console.log("All fields are required!");
      alert("All Fields are Required!");
      return;
    }

    const newTodo = {
      title,
      description,
      status,
    };

    const updatedTodo = {
      id: todo?.id, // optional chaining to avoid error when todo is null
      title,
      description,
      status,
    };

    onSave(todo?.id ? updatedTodo : newTodo); // decide whether it's an update or a create
    setTitle("");
    setDescription("");
    setStatus("");
    setShow(false);
  };

  return (
    <>
      <CustomButton
        variant="primary"
        size="md"
        onClick={handleShow}
        title="Create Todo"
        icon={FaPlus}
        iconPosition="left"
      >
        Add New Todo
      </CustomButton>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{todo ? "Edit Task" : "Add Task"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="todoForm" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your task title..."
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="Enter your task description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Select task status...</option>
                <option value="Pending">Pending</option>
                <option value="In-progress">In-progress</option>
                <option value="Completed">Completed</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" form="todoForm" variant="primary">
            {todo ? "Update" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TodoModal;
