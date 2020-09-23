import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import useSound from "use-sound";
import boring from "../../sounds/boring.mp3";
import AddTodoModal from ".././AddTodoModal";
import { DateToDBDate, isOverDue, makeDateReadable } from "../../api/DateUtils";
import "./Todos.css";
import { db } from "../.././api/firebaseconfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Todos = (props) => {
  // Array to hold the list of todos from firebase
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [play] = useSound(boring);
  toast.configure();

  const BoringLabel = () => {;
    // Had a problem here, I used a useState field here,
    // but react complained about it. So I moved the state to the main function above
    return (
       <div onClick={play} className="no-todos">
        <div className="no-todos">Boring... Nothing to do!</div>
       </div>
    );
  };

  /**
   * Clear the fields
   */
  const cleanFields = () => {
    setErrorMessage("");
    setDescription("");
    setDueDate("");
    setDueTime("");
  };

  /**
   * Show the modal
   */
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
      /**
       * Form is ok, now save the data
       */
      let theDate = "";
      let dateCreated = "";
      // Had to apply this trick in the case the user does not
      // Change the date in the date picker!
      if (dueDate === "") {
        theDate = new Date().toLocaleDateString();
        const newDate = DateToDBDate(theDate);
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
          due_time: dueTime,
          done: false,
          userid: props.authuser.uid,
        })
        .then(() => {
          return toast("Data saved!", {
            position: toast.POSITION.BOTTOM_CENTER,
            type: "success",
            autoClose: 3000,
          });
        })
        .catch((err) => {
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

  /**
   * Primitive function to check form validity
   */
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
    // const id = e.id
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

  // Todo : Add code to edit an existing record
  const editRecord = (id) => {}

  /**
   * Get the todos collection on a per user base
   */
  const getTodos = async () => {
    db.collection("todos")
      .orderBy("due_date")
      .orderBy("due_time")
      .where("userid", "==", props.authuser.uid)
      .onSnapshot((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setTodos(docs);
        console.log("JELL", docs)
      });
  };

  /**
   * useEffect hook
   */
  useEffect(() => {
    // On page load get the todos
    getTodos();
  }, []);

  return (
    <>
      <div className="todo-app">
        <div className="btn-add-container">
          <span className="todo-title-header">Current Agenda items</span>
          <Button className="size-btn" onClick={handleShow}>
            New appointment
          </Button>
        </div>
        <Table responsive striped hover variant="dark">
          <thead>
            <tr>
              <th>Task title</th>
              <th>Date Due</th>
              <th>Time due</th>
              <th>Created</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>
            {/* Display a message when there are no todos */}
            {todos.length === 0 && (
              <tr><td colSpan="5">
                <BoringLabel />
              </td>
              </tr>
            )}
            {/* Display the todos if there are */}
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
                      <td className="todo-item-done">{todo.due_time}</td>
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
                            {makeDateReadable(todo.due_date.toString())}
                          </td>
                          <td className="todo-item-overdue">{todo.due_time}</td>
                          <td className="todo-item-overdue">
                            {makeDateReadable(todo.date_entered.toString())}
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
                            {makeDateReadable(todo.due_date.toString())}
                          </td>
                          <td className="todo-item">{todo.due_time}</td>
                          <td className="todo-item">
                            {makeDateReadable(todo.date_entered.toString())}
                          </td>
                          <td className="todo-item">
                            {todo.done ? "Yes" : "No"}
                          </td>
                        </>
                      )}
                    </>
                  )}
                  <td className={todo.done ? "todo-item-done" : "todo-item"}>
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
                        onClick={() => editRecord(todo.id)}
                        variant="warning"
                      >
                        <i className="material-icons">edit</i>
                      </Button>
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
        dueTime={dueTime}
        setDueTime={setDueTime}
        handleClose={handleClose}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </>
  );
};

export default Todos;
