/*
  Example of using a modal with React Bootstrap
*/
import React, { useState } from "react";
import earthLinks from "../../videos/earthLinks.mp4";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./home.css";
import AddLink from "../AddLink";

const Home = ({ user }) => {
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleShow = () => {
    setDescription("");
    setUrl("");
    setShowModal(true);
  };

  function isFormValid() {
    if (description.length === 0 || url.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  const saveNewLink = () => {
    // Save the gathered data to the local storage, and the reload the data
    let bookmark = {
      name: description,
      url: url,
    };

    if (localStorage.getItem("denkatechBookMarks") === null) {
      // Init array
      let bookmarks = [description, url];
      // Add to array
      bookmarks.push(bookmark);
      // Set to localStorage
      localStorage.setItem("denkatechBookMarks", JSON.stringify(bookmarks));
    } else {
      // Get bookmarks from localStorage
      let bookmarks = JSON.parse(localStorage.getItem("denkatechBookMarks"));
      // Add bookmark to array
      bookmarks.push(bookmark);
      // Re-set back to localStorage
      localStorage.setItem("denkatechBookMarks", JSON.stringify(bookmarks));
    }
  };

  const fetchBookMarks = () => {
    // let bookmarks = JSON.parse(localStorage.getItem("denkatechBookMarks"));
    // let html = "";
    // for (let i = 0; i < bookmarks.length; i++) {
    //   html += "<div className='url-link'" + bookmarks[i] + "</div>";
    // }
    // return <div></div>;
  };

  const handleClose = () => {
    if (isFormValid() === false) {
      setErrorMessage("One or more fields need input!");
      return false;
    } else {
      setShowModal(false);
      setErrorMessage("");
      saveNewLink();
    }
  };

  const handleCloser = () => {
    setErrorMessage("");
    setShowModal(false);
  };

  let doIt = (e) => {
    console.log("Did it", e.target.value);
  };

  return (
    <>
      <video autoPlay loop muted>
        <source src={earthLinks} type="video/mp4" />
      </video>
      <div className="hero-container">
        <p>Home sweet home</p>
        <Button className="btn-add-item" variant="primary" onClick={handleShow}>
          Add Item
        </Button>
        {fetchBookMarks()}
        <AddLink
          showModal={showModal}
          setDescription={setDescription}
          setUrl={setUrl}
          handleClose={handleClose}
          handleCloser={handleCloser}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
        
      </div>
    </>
  );
};

export default Home;
