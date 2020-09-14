import React, {useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import './add.css'

const AddTodoModal = ({
  showModal,
  setDescription,
  dueDate,
  setDueDate,
  handleClose,
  handleCancel,
  errorMessage,
  setErrorMessage,
}) => {

  const [currenDate, setCurrentDate] = useState('')


  const handleDateChanged = (date) => {
    setDueDate(date.toLocaleDateString())
    setCurrentDate(date)
  }

  useEffect(() => {
    setCurrentDate(new Date())
    setDueDate(new Date().toLocaleDateString())
  }, [])

  return (
    <div>
      <Modal
        animation="true"
        centered="true"
        // This is where the modal gets shown or hidden
        show={showModal}
        size="md"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title className="title">Add Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage ? (
            <span className="error">&nbsp;{errorMessage}</span>
          ) : null}
          <Form className="frm-body">
            <Form.Group controlId="form">
              <Form.Label>Describe the todo</Form.Label>
              <Form.Control autoFocus="true"
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="Enter todo description"
              />
              <Form.Label className="frm-label">Due Date</Form.Label>
              <div>
              <DatePicker className="date-picker"
                selected={currenDate}
                onChange={handleDateChanged}/>
              </div>
              <Form.Control
                value = {dueDate}
                
                onChange={(e) => setDueDate(e.target.value)}
                type="text"
                placeholder="Enter due date"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="button-ok" variant="primary" onClick={handleClose}>
            Ok
          </Button>
          <Button
            className="button-cancel"
            onClick={handleCancel}
            variant="warning"
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddTodoModal;
