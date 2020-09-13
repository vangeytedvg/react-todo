import React from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import '.././components/pages/home.css'

import Form from 'react-bootstrap/Form'

const AddLink = ({ showModal, setDescription, setUrl, handleClose, handleCloser, errorMessage, setErrorMessage }) => {
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
        <Modal.Header className="modal-header">
          <Modal.Title className="modal-title">Add a new Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Todo details
          {errorMessage ? (
            <span className="error">&nbsp;{errorMessage}</span>
          ) : null}
          <Form className="frm-body">
            <Form.Group controlId="form">
              <Form.Label className="frm-label">Link description</Form.Label>
              <Form.Control
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="Enter a description here"
              />
              <Form.Label className="frm-label">Link adress</Form.Label>
              <Form.Control
                onChange={(e) => setUrl(e.target.value)}
                type="text"
                placeholder="Paste or enter a valid url here"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="button-ok" variant="primary" onClick={handleClose}>
            Ok
          </Button>
          <Button className="button-cancel" variant="warning" onClick={handleCloser}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddLink;
