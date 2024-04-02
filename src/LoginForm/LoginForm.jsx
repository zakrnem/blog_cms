import { useEffect } from "react";
import styles from "./LoginForm.module.css";
import { useNavigate } from "react-router-dom";

function LoginForm({ setActiveElement, setError, auth }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) navigate("/home");
    setActiveElement("login");
  });

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
    }).then((response) => {
      if (!response.ok) {
        switch (true) {
          case response.status === 400:
            {
              setError({
                state: true,
                title: "Bad request",
                message: "Username not found",
              });
            }
            break;
          case response.status === 401:
            {
              setError({
                state: true,
                title: "Unauthorized",
                message: "Password is wrong",
              });
            }
            break;
          case response.status === 403:
            {
              setError({
                state: true,
                title: "Forbidden",
                message: "User doesn't have ADMIN credentials",
              });
            }
            break;
        }
      } else {
        setError({ state: false });
        navigate("/posts");
      }
      return response.json();
    });
  };

  return (
    <div className={styles.login}>
      <div className={styles.title}>Log in to your account</div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            minLength={3}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            minLength={4}
            required
          />
        </div>
        <input className={styles.submit} type="submit" />
      </form>
    </div>
  );
}

export default LoginForm;
