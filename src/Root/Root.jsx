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

function Root() {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState([]);
  const [activeElement, setActiveElement] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
        setErrorMessage({ message: err.message });
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
          setErrorMessage({ message: err.message });
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
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
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
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          }
        />
        <Route
          path="/login"
          element={
            <LoginForm
              setActiveElement={setActiveElement}
              error={error}
              setError={setError}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <SignupForm
              setActiveElement={setActiveElement}
              error={error}
              setError={setError}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
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
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
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
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          }
        />
        <Route
          path="/post/edit"
          element={
            <PostEdit
              setActiveElement={setActiveElement}
              error={error}
              setError={setError}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          }
        />
        <Route
          path="/post/new"
          element={
            <PostNew
              setActiveElement={setActiveElement}
              error={error}
              setError={setError}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
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
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          }
        />
      </Routes>
    </>
  );
}

export default Root;
