import React from "react";

const Login = (props) => {
  // Destructure the props parameter
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignUp,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
  } = props;

  return (
    <section className="login">
      <div className="loginContainer">
        <label>Username</label>
        <input
          type="text"
          autoFocus
          required
          value={email}
          // When the value changes emit this to app.js
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* If there is an error display it here */}
        <p className="errorMsg">{emailError}</p>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="errorMsg">{passwordError}</p>
        <div className="btnContainer">
          {/* Note the usage of the react fragment, because we
           * are returning more than one tag*/}
          {hasAccount ? (
            <>
              <button className="button-login" onClick={handleLogin}>Sign in</button>
              <p>
                Don't have an account ?{" "}
                <span onClick={() => setHasAccount(!hasAccount)}>Sign Up</span>
              </p>
            </>
          ) : (
            <>
              <button className="button-login" onClick={handleSignUp}>Sign Up</button>
              <p>
                Have an account ? <span  onClick={() => setHasAccount(!hasAccount)}>Sign In</span>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
