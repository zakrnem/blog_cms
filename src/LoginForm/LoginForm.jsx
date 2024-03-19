import { useEffect, useState } from "react";
import styles from "./LoginForm.module.css";
import { useNavigate } from "react-router-dom";

function LoginForm({
  setActiveElement,
  error,
  setError,
  errorMessage,
  setErrorMessage,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    setActiveElement("login");
  });

  useEffect(() => {
    console.log(error, errorMessage);
  }, [error]);

  const apiURL = import.meta.env.VITE_API_URL + "/login";

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.querySelector("#username").value;
    const password = e.target.querySelector("#password").value;
    const data = { username, password };
    fetch(apiURL, {
      method: "post",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          setError(true);
          if (response.status === 400) {
            setErrorMessage({
              title: "Bad request",
              message: "Username or password are wrong",
            });
          } else {
            setErrorMessage({
              title: "HTTP Error",
              message: `This is an HTTP error: The status is ${response.status}`,
            });
          }
        } else {
          setError(false);
        }
        return response.json();
      })
      .finally(() => navigate("/posts"));
  };

  return (
    <div className={styles.login}>
      {error && (
        <div className={styles.error}>
          <div className={styles.errorTitle}>{errorMessage.title}</div>
          <>{errorMessage.message}</>
        </div>
      )}
      <div className={styles.title}>Log in to your account</div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" placeholder="Enter your username" />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
          />
        </div>
        <input className={styles.submit} type="submit" />
      </form>
    </div>
  );
}

export default LoginForm;
