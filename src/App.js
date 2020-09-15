import React, { useState, useEffect } from "react";
import fire from "./api/firebaseconfig";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/pages/Home.jsx";
import Login from "./components/Login";
import Todos from "./components/pages/Todos";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState();
  const [hasAccount, setHasAccount] = useState(false);

  /**
   * Clear the input fields
   */
  const clearInput = () => {
    setEmail("");
    setPassword("");
  };

  /**
   * Clear the errors
   */
  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  /**
   * Handle Login to firebase
   */
  const handleLogin = () => {
    clearErrors();
    console.log("In handlelogin");
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        console.log(err);
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  /**
   * Handle Sign Up to firebase
   */
  const handleSignUp = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  /**
   * Handle logout from firebase
   */
  const handleLogout = () => {
    fire.auth().signOut();
    console.log("KWAKKEKDIKEK")
  };

  /**
   * Firebase authentication listener
   */
  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInput();
        // We have a valid user!
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  /**
   * useEffect section
   */
  useEffect(() => {
    // Start listening
    authListener();
  });

  return (
    <div className="App">
      {user ? (
        <>
          <Router>
            <Navigation handleLogout={handleLogout} />
            <Switch>
              <Route path="/" component={Home} exact />
              {/* Passing props through router */}
              <Route path="/todos" render={(props) => <Todos {...props} authuser={user}></Todos>}/>
            </Switch>
          </Router>
        </>
      ) : (
        <Login
          // Pass the states to the login component
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleSignUp={handleSignUp}
          // Used to toggle the button sign up or sign in
          // depending if the user has an account
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailError={emailError}
          passwordError={passwordError}
        />
      )}
    </div>
  );
}

export default App;
