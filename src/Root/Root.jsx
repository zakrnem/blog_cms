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
  const [error, setError] = useState("");
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState([]);
  const [activeElement, setActiveElement] = useState("");

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
        setError(err.message);
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
          setError(err.message);
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
        <Route path="" element={<Homepage setActiveElement={setActiveElement} auth={auth} />} />
        <Route path="/login" element={<LoginForm setActiveElement={setActiveElement} />} />
        <Route path="/signup" element={<SignupForm setActiveElement={setActiveElement} />} />
        <Route path="/posts" element={<PostsDash setActiveElement={setActiveElement} />} />
        <Route path="/comments" element={<CommentsDash setActiveElement={setActiveElement} />} />
        <Route path="/post/edit" element={<PostEdit setActiveElement={setActiveElement} />} />
        <Route path="/post/new" element={<PostNew setActiveElement={setActiveElement} />} />
      </Routes>
    </>
  );
}

export default Root;
