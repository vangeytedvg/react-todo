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
  const [passwordError, setPasswordErro] = useState();
  const [hasAccount, setHasAccount] = useState(false);

  const handleLogin = () => {
    firebaseConfig
      .auth()
      .signInWithEmailAndPassword(email, password)
  }

  return (
    <div className="App">
      Hello World
    </div>
  );
}

export default App;
