import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PostNew.module.css";

function PostNew({ setActiveElement, error, setError, auth, user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (error.state) navigate("/home");
    setActiveElement("newpost");
  });

  const apiURL = import.meta.env.VITE_API_URL + "/posts";

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.querySelector("#title").value;
    const content = e.target.querySelector("#content").value;
    const visible = e.target.querySelector("#visible").checked;
    const data = { user, title, content, visible };

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
        if (response.status === 401) {
          setError({
            state: true,
            title: "Unauthorized",
            message: "Please log in before submitting a post",
          });
        }
        if (response.status === 400) {
          setError({
            state: true,
            title: "Bad request",
            message: "There's another post with the same title",
          });
        } else {
          setError({
            state: true,
            title: "HTTP Error",
            message: `This is an HTTP error: The status is ${response.status}`,
          });
        }
      } else {
        setError({ state: false });
        navigate("/posts");
      }
      return response.json();
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Create a new post</div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            placeholder="Enter a title for the post"
          />
        </>
        <>
          <label htmlFor="content">Content: </label>
          <textarea
            id="content"
            className={styles.content}
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
          ></textarea>
        </>
        <div className={styles.visibility}>
          <input type="checkbox" id="visible"></input>
          <label>Visible</label>
        </div>
        <input className={styles.submit} type="submit" />
      </form>
    </div>
  );
}

export default PostNew;
