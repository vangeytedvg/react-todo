import React, { useState, useEffect } from "react";
import { Table, Button, Form, Col, Row } from "react-bootstrap";
import AddTodoModal from ".././AddTodoModal";
import { DateToDBDate, isOverDue } from "../../api/DateUtils";
import "./Todos.css";
import { db } from "../.././api/firebaseconfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Todos = () => {
  // Array to hold the list of todos from firebase
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [startDate, setStartDate] = useState("");
  toast.configure();

  const cleanFields = () => {
    setErrorMessage("");
    setDescription("");
    setDueDate("");
  };

  const handleShow = () => {
    cleanFields();
    setShowModal(true);
  };

  /**
   * Check if the modal contains correct data, the add the record
   */
  const handleClose = () => {
    if (isFormValid() === false) {
      setErrorMessage("One or more fields need input!");
      return false;
    } else {
      let theDate = "";
      let dateCreated = "";
      // Had to apply this trick in the case the user does not
      // Change the date in the date picker!
      if (dueDate === "") {
        theDate = new Date().toLocaleDateString();
        const newDate = DateToDBDate(theDate);
        console.log("newdate = ", newDate);
      } else {
        theDate = dueDate;
      }
      dateCreated = new Date().toLocaleDateString();
      const convertedDate = DateToDBDate(theDate);
      db.collection("todos")
        .add({
          title: description,
          date_entered: DateToDBDate(dateCreated),
          due_date: convertedDate,
          done: false,
        })
        .then(() => {
          console.log("Data Added");
          return toast("Data saved!", {
            position: toast.POSITION.BOTTOM_CENTER,
            type: "success",
            autoClose: 3000,
          });
        })
        .catch((err) => {
          console.log(err);
          return toast(`Error! ${err}`, {
            position: toast.POSITION.BOTTOM_CENTER,
            type: "error",
            autoClose: 10000,
          });
        });
      setShowModal(false);
      cleanFields();
    }
  };

  /**
   * User clicked on cancel, clean up
   */
  const handleCancel = () => {
    setShowModal(false);
    cleanFields();
  };

  function isFormValid() {
    if (description.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Delete a todo based on it's id
   * @param {*} id
   */
  const deleteItem = (id) => {
    if (!id) return;
    console.log("Deleting ", id);
    // const id = e.id
    // console.log(id)
    db.collection("todos")
      .doc(id)
      .delete()
      .then(() => {
        return toast("Record deleted", {
          position: toast.POSITION.BOTTOM_CENTER,
          type: "info",
          autoClose: 3000,
        });
      })
      .catch((err) => {
        return toast("Error", {
          position: toast.POSITION.BOTTOM_CENTER,
          type: "warning",
          autoClose: 3000,
        });
      });
  };

  /**
   * Update the record given by id
   * @param {U} id
   */
  const editItem = (id, state) => {
    db.collection("todos")
      .doc(id)
      .update({ done: !state })
      .then(() => {
        return toast("Todo updated", {
          position: toast.POSITION.BOTTOM_RIGHT,
          type: "info",
          autoClose: 1000,
        });
      })
      .catch((err) => {
        return toast("Error", {
          position: toast.POSITION.BOTTOM_RIGHT,
          type: "warning",
          autoClose: 1000,
        });
      });
  };

  /**
   * Get the todos collection
   */
  const getTodos = async () => {
    db.collection("todos")
      .orderBy("due_date")
      .onSnapshot((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        console.log("Docs ", docs);
        setTodos(docs);
      });
  };

  // const haveFun = (datefield) => {
  //   let duedat = new Date()
  //   let today = new Date()
  //   duedat = Date(datefield)
  //   console.log(today === duedat)
  // }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <div className="todo-app">
        <div className="btn-add-container">
          <Button className="size-btn" onClick={handleShow}>
            Add new todo
          </Button>
        </div>
        <Table responsive striped hover variant="dark">
          <thead>
            <tr>
              {/* <th>Id</th> */}
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
                  {/* <td>{todo.id}</td> */}
                  {todo.done === true && (
                    <>
                      <td className="todo-item-done">{todo.title}</td>
                      <td className="todo-item-done">
                        {todo.due_date.toString()}
                      </td>
                      <td className="todo-item-done">
                        {todo.date_entered.toString()}
                      </td>
                      <td className="todo-item-done">
                        {todo.done ? "Yes" : "No"}
                      </td>
                    </>
                  )}
                  {todo.done === false && (
                    <>
                      {isOverDue(todo.due_date) === true && (
                        <>
                          <td className="todo-item-overdue">{todo.title}</td>
                          <td className="todo-item-overdue">
                            {todo.due_date.toString()}
                          </td>
                          <td className="todo-item-overdue">
                            {todo.date_entered.toString()}
                          </td>
                          <td className="todo-item-overdue">
                            {todo.done ? "Yes" : "No"}
                          </td>
                        </>
                      )}
                    </>
                  )}
                  {todo.done === false && (
                    <>
                      {isOverDue(todo.due_date) === false && (
                        <>
                          <td className="todo-item">{todo.title}</td>
                          <td className="todo-item">
                            {todo.due_date.toString()}
                          </td>
                          <td className="todo-item">
                            {todo.date_entered.toString()}
                          </td>
                          <td className="todo-item">
                            {todo.done ? "Yes" : "No"}
                          </td>
                        </>
                      )}
                    </>
                  )}
                  <td className={todo.done ? "todo-item-done" : "todo-item"}>
                    <i className="" />
                    <span className="spacer">
                      {todo.done && (
                        <Button
                          onClick={() => editItem(todo.id, todo.done)}
                          variant="primary"
                        >
                          <i className="material-icons">undo</i>
                        </Button>
                      )}
                      {!todo.done && (
                        <Button
                          onClick={() => editItem(todo.id, todo.done)}
                          variant="primary"
                        >
                          <i className="material-icons">done</i>
                        </Button>
                      )}
                    </span>
                    <span className="spacer">
                      <Button
                        onClick={() => deleteItem(todo.id)}
                        variant="warning"
                      >
                        <i className="material-icons">delete</i>
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
