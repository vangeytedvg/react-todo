import React, { useState, useEffect } from "react";
import { Table, Button, Form, Col, Row } from "react-bootstrap";
import AddTodoModal from ".././AddTodoModal";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "./Todos.css";
import { db } from "../.././api/firebaseconfig";

const Todos = () => {
  // Array to hold the list of todos from firebase
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState('')
  const [errorMessage, setErrorMessage] = useState("");

  toast.configure()
  
  const handleShow = () => {
    setDescription("");
    setShowModal(true); 
  };

  const saveNewTodo = () => {
    return toast("Data saved!", {position: toast.POSITION.BOTTOM_CENTER, type: "success", autoClose: 3000})
  };

  const handleClose = () => {
    if (isFormValid() === false) {
      setErrorMessage("One or more fields need input!");
      return false;
    } else {
      db.collection("todos").add({
        title: description,
        date_entered:'',
        due_date: dueDate,
        done: false
      }).then(() => {
        console.log("Data Added")
        
      }).catch((err) => {
        console.log(err)
      })
      setShowModal(false);
      setErrorMessage("");
      saveNewTodo();
    }
  };


  const handleCancel = () => {
    setShowModal(false);
    setErrorMessage("");
  };

  function isFormValid() {
    if (description.length === 0 || dueDate.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  const deleteItem = (id) => {
    if (!id) return
    console.log("Deleting ", id);
    // const id = e.id
    // console.log(id)
    db.collection("todos").doc(id).delete().then(() => {
      return toast("Record deleted", {position: toast.POSITION.TOP_CENTER, type: "info", autoClose: 3000})
    }).catch((err) => {
      return toast("Error", {position: toast.POSITION.TOP_CENTER, type: "warning", autoClose: 3000})
    })
  };

  const addItem = () => {
    console.log("Add");
  };

  const getTodos = async () => {
    db.collection("todos").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      console.log("Docs ", docs);
      setTodos(docs);
    });
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <div className="todo-app">
        <div className="test">
          <Button className="size-btn" onClick={handleShow}>
            Add new todo
          </Button>
        </div>
        <Table responsive striped hover variant="dark">
          <thead>
            <tr>
              <th>Id</th>
              <th>Task title</th>
              <th>Date Due</th>
              <th>Created</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, key) => {
              return (
                <tr key={key}>
                  <td>{todo.id}</td>
                  <td>{todo.title}</td>
                  <td className="todo-date">{todo.due_date}</td>
                  <td className="todo-date">{todo.date_entered}</td>
                  <td className="todo-done">{todo.done ? "Yes" : "No"}</td>
                  <td>
                    <span className="spacer">
                      <Button
                        onClick={() => addItem}
                        className="delete-btn"
                        variant="primary"
                      >
                        Edit
                      </Button>
                    </span>
                    <span className="spacer">
                      <Button
                        onClick={() => deleteItem(todo.id)}
                        className="delete-btn"
                        variant="warning"
                      >
                        Delete
                      </Button>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <AddTodoModal
        showModal={showModal}
        handleCancel={handleCancel}
        setDescription={setDescription}
        dueDate={dueDate}
        setDueDate={setDueDate}
        handleClose={handleClose}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </>
  );
};

export default Todos;
