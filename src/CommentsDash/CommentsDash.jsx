import { useState, useEffect } from "react";
import styles from "./CommentsDash.module.css";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";

function CommentsDash({ setActiveElement, errorMessage, setErrorMessage }) {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setActiveElement("comments");
  });

  const handleCommentClick = (e) => {
    e.preventDefault();
    console.log("Clicked comment");
  };

  useEffect(() => {
    if (error !== null) console.log(error);
  }, [error]);

  useEffect(() => {
    const apiURL = import.meta.env.VITE_API_URL + "/comments";
    fetch(apiURL, { method: "get" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`,
          );
        }
        return response.json();
      })
      .then((actualData) => setBlogData(actualData))
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.posts}>
      {loading && blogData.length < 1 && (
        <div className={styles.loading}>
          <div className={styles.loader} />
          Loading
        </div>
      )}
      {Object.keys(blogData).map((index) => {
        const key = uuidv4();
        const title = blogData[index].post;
        const message = blogData[index].message;
        const date = blogData[index].date;
        const author = blogData[index].author;
        const id = blogData[index].id;
        return (
          <div key={key}>
            <div className={styles.comment}>
              <Link to="#" onClick={handleCommentClick}>
                <div className={styles.title} id={id}>
                  {title}
                  <div className={styles.data}>
                    <div className={styles.date}>{date}</div>
                    <div className={styles.author}>{author}</div>
                  </div>
                </div>
              </Link>
              <div className={styles.message}>{message}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CommentsDash;
