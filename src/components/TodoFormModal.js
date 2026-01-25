import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomButton from "./Button";
import { FaPlus } from "react-icons/fa";
import { statusOptions } from "../utils/statusOptions";
import { normalizeEnum } from "../utils/enumNormalizer";

const TodoFormModal = ({ todo, onSave, onClose, apiError }) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  // local error state
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (apiError) {
      setErrors(apiError.fieldErrors || {});
      setFormError(apiError.message || "");
    }
  }, [apiError]);

  const handleShow = () => {
    setErrors({});
    setFormError("");
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setErrors({});
    setFormError("");
    setTitle("");
    setDescription("");
    setStatus("");
    onClose?.();
  };

  useEffect(() => {
    if (todo) {
      console.log("RAW backend status:", JSON.stringify(todo.status));
      console.log(
        "Available option values:",
        statusOptions.map((o) => o.value),
      );

      const normalizedStatus = normalizeEnum(todo.status);

      setTitle(todo.title ?? "");
      setDescription(todo.description ?? "");
      setStatus(normalizedStatus);
      setErrors({}); // ✅ reset errors
      setFormError(""); // ✅ reset form error
      setShow(true);
    }
  }, [todo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = todo?.id
      ? { id: todo.id, title, description, status }
      : { title, description, status };

    const success = await onSave(payload);

    if (success) {
      setShow(false);
      setTitle("");
      setDescription("");
      setStatus("");
    }
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
              {/* {formError && (
                <div className="alert alert-danger" role="alert">
                  {formError}
                </div>
              )} */}
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your task title..."
                autoFocus
                value={title}
                isInvalid={!!errors.title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="Enter your task description..."
                value={description}
                isInvalid={!!errors.description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Select
                value={status}
                isInvalid={!!errors.status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">-- Select status --</option>

                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.status}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            type="submit"
            form="todoForm"
            variant={todo ? "success" : "primary"}
          >
            {todo ? "Update" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TodoFormModal;
