import React, { useState, useEffect } from 'react';
import firebaseConfig from "./api/firebaseconfig"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './components/pages/Home.jsx'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState();
  const [hasAccount, setHasAccount] = useState(false);

  /**
   * Handle Login to firebase
   */
  const handleLogin = () => {
    firebaseConfig
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
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
      })
  }

  /**
   * Handle Sign Up to firebase
   */
  const handleSignUp = () => {
    firebaseConfig
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
      })
  }

  /**
   * Handle logout from firebase
   */
  const handleLogout = () => {
    firebaseConfig.auth().signOut()
  }

  const authListener = () => {
    
  }

  return (
    <div className="App">
      Hello World
    </div>
  );
}

export default App;
