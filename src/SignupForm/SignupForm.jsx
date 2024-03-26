import styles from "./SignupForm.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignupForm({ setActiveElement, setError }) {
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
    }).then((response) => {
      if (!response.ok) {
        setError(true);
        if (response.status === 400) {
          setError({
            state: true,
            title: "Bad request",
            message: "Please check the requirements",
          });
        } else {
          setError({
            state: true,
            title: "HTTP Error",
            message: `This is an HTTP error: The status is ${response.status}`,
          });
        }
      } else {
        setError({
          state: true,
          title: "Thank you for registering!",
          message: `Please allow up to one business day for your account to be validated. We appreciate your patience!`,
        });
        navigate("/home");
      }
      return response.json();
    });
  };

  return (
    <div className={styles.signup}>
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
