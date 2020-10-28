/**
 * This is the todos on fire part of the book-keeper application.
 * These todos are stored in the todosonfire collection of firebase
 * and are independent of the Todos.jsx component.
 * Author : Danny Van Geyte
 * History:
 *  DEVSTART : 18/09/2020
 *  MOD :
 *      - 20/09/2020 Fine tuning of the firebase collection todosonfire
 */
import React, { useState, useEffect } from "react";
import fire, { db } from "../.././api/firebaseconfig";
import { toast } from "react-toastify";
import styles from "../styles/todo_on_fire.module.css";
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-loader-spinner";

toast.configure();

const adtbtn = "material-icons " + styles.tdof_add_btn;
const edtbtn = "material-icons " + styles.tdof_i;

const TodoOnFire = (props) => {
  const [done, setDone] = useState(true);
  const [todos, setTodos] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addNewTodo = (e) => {
    if (e.key === "Enter") {
      // If the keystroke is not enter
      if (!newItem) {
        return toast(`Error! Can not add an empty todo`, {
          position: toast.POSITION.TOP_CENTER,
          type: "error",
          autoClose: 1000,
        });
      }
      db.collection("todosonfire")
        .add({
          title: newItem,
          date_entered: new Date(),
          due_date: new Date(),
          due_time: "",
          done: false,
          userid: props.authuser.uid,
        })
        .then(() => {
          setNewItem("");
          return toast("Todo saved!", {
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
    }
  };

  const markAsDone = (id, state) => {
    db.collection("todosonfire")
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
        // We have an error
        return toast("Error", {
          position: toast.POSITION.BOTTOM_RIGHT,
          type: "warning",
          autoClose: 1000,
        });
      });
  };

  const deleteItem = (id) => {
    if (!id) return;
    // const id = e.id
    db.collection("todosonfire")
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
   * Get the todos collection on a per user base
   */
  const getTodos = async () => {
    setIsLoading(true);
    db.collection("todosonfire")
      .orderBy("date_entered", "desc", "title")
      // .orderBy("title")
      .where("userid", "==", props.authuser.uid)
      .onSnapshot((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setTodos(docs);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className={styles.tdofcontainer}>
      <h1 className={styles.tdofcontainertitle}>Todo's on Fire</h1>
      <div className={styles.tdf_input_add}>
        <div className={styles.tdof_add}>
          <input
            className={styles.tdof_input_field}
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="<Add new item>"
            onKeyPress={addNewTodo}
            required
          />
        </div>
      </div>
      {isLoading && (
        <div>
          <Loader
            type="Circles"
            color="#00BFFF"
            height={30}
            width={30}
            timeout={10000} //3 secs
          />
        </div>
      )}
      {!isLoading &&
        todos.map((todo, key) => {
          return (
            <div
              key={key}
              className={todo.done ? styles.tdof_item_done : styles.tdof_item}
            >
              <h2 className={styles.tdf_item_content}>{todo.title}</h2>
              <div>
                <i
                  onClick={() => markAsDone(todo.id, todo.done)}
                  className={edtbtn}
                >
                  done
                </i>
                <i onClick={() => deleteItem(todo.id)} className={edtbtn}>
                  delete
                </i>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default TodoOnFire;
