/**
 * AddTodoModal.jsx
 * Add or edit a new agenda item to firebase.
 */
import React, {useEffect, useState, useRef} from "react";
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
  dueTime,
  setDueTime,
  handleClose,
  handleCancel,
  errorMessage,
}) => {

  const [currenDate, setCurrentDate] = useState('')

  const handleDateChanged = (date) => {
    setDueDate(date.toLocaleDateString())
    setDueTime(date.toLocaleTimeString())
    setCurrentDate(date)
  }

  useEffect(() => {
    setCurrentDate(new Date())
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
          <Form className="frmadd-body">
            <Form.Group>
              <Form.Label>Describe the todo</Form.Label>
              <Form.Control 
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="Enter agenda topic"
              />
              <Form.Label className="frm-label">Due Date</Form.Label>
              <div>  
              <DatePicker className="date-picker"
                selected={currenDate}
                showTimeSelect
                onChange={handleDateChanged}/>
              </div>
              <section className="date-time-fields">
              <Form.Control className="date-picker"
                value = {dueDate}
                disabled
                onChange={(e) => setDueDate(e.target.value)}
                type="text"
                placeholder="Due date"
              />
              <Form.Control className="date-picker"
                value = {dueTime}
                disabled
                onChange={(e) => setDueTime(e.target.value)}
                type="text"
                placeholder="Due time"
              />
              </section>
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
