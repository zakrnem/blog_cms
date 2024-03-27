import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import ErrorPage from "../error-page";
import Homepage from "../Homepage/Homepage";
import LoginForm from "../LoginForm/LoginForm";
import SignupForm from "../SignupForm/SignupForm";
import PostsDash from "../PostsDash/PostsDash";
import CommentsDash from "../CommentsDash/CommentsDash";
import PostEdit from "../PostEdit/PostEdit";
import PostNew from "../PostNew/PostNew";
import ErrorWindow from "../ErrorWindow/ErrorWindow";

function Root() {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState([]);
  const [activeElement, setActiveElement] = useState("");
  const [error, setError] = useState({
    state: false,
  });

  const isAuthURL = import.meta.env.VITE_API_URL + "/is_auth";
  useEffect(() => {
    fetch(isAuthURL, { method: "get", credentials: "include" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`,
          );
        }
        return response.json();
      })
      .then((response) => setAuth(response))
      .catch((err) => {
        setError({ state: true, title: "HTTP Error", message: err.message });
      });
  });

  const getUserURL = import.meta.env.VITE_API_URL + "/user";
  useEffect(() => {
    if (auth) {
      fetch(getUserURL, { method: "get", credentials: "include" })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `This is an HTTP error: The status is ${response.status}`,
            );
          }
          return response.json();
        })
        .then((response) => setUser(response))
        .catch((err) => {
          setError({ state: true, title: "HTTP Error", message: err.message });
        });
    }
  }, [auth]);

  return (
    <>
      <Header
        activeElement={activeElement}
        setActiveElement={setActiveElement}
        auth={auth}
        setAuth={setAuth}
        user={user}
      />
      <ErrorWindow error={error} setError={setError} />

      <Outlet />
      <Routes errorElement={<ErrorPage />}>
        <Route
          path=""
          element={
            <Homepage
              setActiveElement={setActiveElement}
              auth={auth}
              error={error}
              setError={setError}
            />
          }
        />
        <Route
          path="/home"
          element={
            <Homepage
              setActiveElement={setActiveElement}
              auth={auth}
              error={error}
              setError={setError}
            />
          }
        />
        <Route
          path="/login"
          element={
            <LoginForm
              setActiveElement={setActiveElement}
              setError={setError}
              auth={auth}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <SignupForm
              setActiveElement={setActiveElement}
              setError={setError}
              auth={auth}
            />
          }
        />
        <Route
          path="/posts"
          element={
            <PostsDash
              setActiveElement={setActiveElement}
              error={error}
              setError={setError}
            />
          }
        />
        <Route
          path="/comments"
          element={
            <CommentsDash
              setActiveElement={setActiveElement}
              error={error}
              setError={setError}
            />
          }
        />
        <Route
          path="/editpost"
          element={
            <PostEdit
              setActiveElement={setActiveElement}
              error={error}
              setError={setError}
            />
          }
        />
        <Route
          path="/newpost"
          element={
            <PostNew
              setActiveElement={setActiveElement}
              error={error}
              setError={setError}
            />
          }
        />
        <Route
          path="/error"
          element={
            <ErrorPage
              setActiveElement={setActiveElement}
              error={error}
              setError={setError}
            />
          }
        />
      </Routes>
    </>
  );
}

export default Root;
