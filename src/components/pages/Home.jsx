/*
  Example of using a modal with React Bootstrap
*/
import React, { useState } from "react";
// import pexels from "../videos/earthLinks.mp4";
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import './home.css'

const Home = () => {
  const [showModal, setShowModal] = useState(false)
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
 
  const handleShow = () => {
    setDescription('')
    setUrl('')  
    setShowModal(true)
  }

  function isFormValid() {
    if (description.length === 0 || url.length === 0) {
      return false
    } else {
      return true
    }
  }

  const saveNewLink = () => {
    // Save the gathered data to the local storage, and the reload the data
    let bookmark = {
      name: description,
      url: url
    }

    if(localStorage.getItem('denkatechBookMarks') === null){
      // Init array
      let bookmarks = [description, url];
      // Add to array
      bookmarks.push(bookmark);
      // Set to localStorage
      localStorage.setItem('denkatechBookMarks', JSON.stringify(bookmarks));
    } else {
      // Get bookmarks from localStorage
      let bookmarks = JSON.parse(localStorage.getItem('denkatechBookMarks'));
      // Add bookmark to array
      bookmarks.push(bookmark);
      // Re-set back to localStorage
      localStorage.setItem('denkatechBookMarks', JSON.stringify(bookmarks));
    }
  }

  const fetchBookMarks = () => {
    let bookmarks = JSON.parse(localStorage.getItem('denkatechBookMarks'))
    let html = ''
    for (let i=0; i<bookmarks.length; i++) {
      html += "<div className='url-link'" + bookmarks[i] +"</div>"
    }
  }

  const handleClose = () => {
      if (isFormValid() === false) {
        setErrorMessage("One or more fields need input!")
        return false
      } else {
        setShowModal(false)
        setErrorMessage('')
        saveNewLink()
      }
  }

  const handleCloser = () => {
    setErrorMessage('')
    setShowModal(false)
  }

  let doIt = (e) => {
    console.log("Did it", e.target.value)
  }

  return (
    <>
      <div className="hero-container">
        <p>Home sweet home</p>
        <Button className="btn-add-item" variant="primary" onClick={handleShow}>Add Item</Button>
        {/* <video autoPlay loop muted>
          <source src={pexels} type="video/mp4" />
        </video> */}
        {fetchBookMarks}
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
             {errorMessage ? <span className="error">&nbsp;{errorMessage}</span> : null}
            <Form className="frm-body">
              <Form.Group controlId="form">
              <Form.Label className="frm-label">Link description</Form.Label>
              <Form.Control onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Enter a description here" />
              <Form.Label className="frm-label">Link adress</Form.Label>
              <Form.Control onChange={(e) => setUrl(e.target.value)} type="text" placeholder="Paste or enter a valid url here" />
          </Form.Group>
          </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Ok
            </Button>
            <Button variant="warning" onClick={handleCloser}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Home;
