import styles from "./PostEdit.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function PostEdit({ setActiveElement, error, setError, user, postURL }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState({});
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (error.state) navigate("/home");
    setActiveElement("editpost");
  });

  // Fetch existing post from server
  useEffect(() => {
    fetch(postURL, { method: "get" })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            setError({
              state: true,
              title: "Unauthorized",
              message: "Please log in before editing a post",
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
        }
        return response.json();
      })
      .then((actualData) => setPostData(actualData))
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [postURL]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userid = user.userId;
    const title = document.querySelector("#title").value;
    const content = document.querySelector("#content").textContent;
    const id = document.querySelector("form").id;
    const data = { userid, title, content, visible, id };

    //console.log(data)

    fetch(postURL, {
      method: "put",
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

  const handleVisibility = (e) => {
    setVisible(!visible);
  };

  const title = postData.title;
  const content = postData.content;
  const id = postData._id;

  let date;
  let comments;
  const dataLength = Object.keys(postData).length;
  if (dataLength > 0) {
    date = postData.createdAt;
    comments = postData.comments;
  }

  return (
    <div className={styles.container}>
      {loading && dataLength < 1 && (
        <div className={styles.loading}>
          <div className={styles.loader} />
          Loading
        </div>
      )}
      {dataLength > 0 && (
        <>
          <div className={styles.title}>Edit post</div>
          <form onSubmit={handleSubmit} className={styles.form} id={id}>
            <>
              <label htmlFor="title">Title: </label>
              <input type="text" id="title" defaultValue={title} />
            </>
            <>
              <label htmlFor="content">Content: </label>
              <textarea
                id="content"
                className={styles.content}
                defaultValue={content}
              ></textarea>
            </>
            <div className={styles.visible}>
              <input
                type="checkbox"
                id="visible"
                checked={visible}
                onChange={handleVisibility}
              ></input>
              <label>Visible</label>
            </div>
            <input className={styles.submit} type="submit" />
          </form>
        </>
      )}
    </div>
  );
}

export default PostEdit;
