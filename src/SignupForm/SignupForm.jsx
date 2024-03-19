import styles from "./SignupForm.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignupForm({
  setActiveElement,
  error,
  setError,
  errorMessage,
  setErrorMessage,
}) {
  const navigate = useNavigate();
  useEffect(() => {
    setActiveElement("signup");
  });

  const apiURL = import.meta.env.VITE_API_URL + "/signup";
  const handleSubmit = (e) => {
    e.preventDefault();
    const firstName = e.target.querySelector("#firstName").value;
    const lastName = e.target.querySelector("#lastName").value;
    const username = e.target.querySelector("#username").value;
    const password = e.target.querySelector("#password").value;
    const data = { firstName, lastName, username, password };
    fetch(apiURL, {
      method: "post",
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
      .finally(() => {
        navigate("/error");
      });
  };

  return (
    <div className={styles.signup}>
      {error && (
        <div className={styles.error}>
          <div className={styles.errorTitle}>{errorMessage.title}</div>
          <>{errorMessage.message}</>
        </div>
      )}
      <div className={styles.title}>Create an account</div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="firstName">First Name: </label>
          <input
            type="text"
            id="firstName"
            placeholder="Enter your first name"
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name: </label>
          <input type="text" id="lastName" placeholder="Enter your last name" />
        </div>
        <div>
          <label htmlFor="username">Email: </label>
          <input type="text" id="username" placeholder="Enter your email" />
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

export default SignupForm;
