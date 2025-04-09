import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomButton from "./CustomButton";
import { FaPlus } from "react-icons/fa";

const TodoModal = ({ onCreateTodo }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !status) {
      console.log("All fields are required!");
      alert("All Fields are Required!");
      return;
    }

    // const id = crypto.randomUUID(); // generate a unique ID
    // const id = crypto?.randomUUID?.() || Date.now().toString();
    const id = Math.floor(Math.random() * 50) + 1; // Random no. 1-50
    const newTodo = {
      id,
      title: title,
      description: description,
      status: status,
    };

    console.log(newTodo);
    onCreateTodo(newTodo);

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
        Todo
      </CustomButton>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>To Do</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="todoForm" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your todo title..."
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
                placeholder="Enter your todo description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Select todo status...</option>
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
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TodoModal;
