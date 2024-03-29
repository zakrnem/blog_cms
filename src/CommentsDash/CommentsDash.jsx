import { useState, useEffect } from "react";
import styles from "./CommentsDash.module.css";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";

function CommentsDash({ setActiveElement, error, setError }) {
  const navigate = useNavigate();
  const page = 1;
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (error.state) navigate("/home");
    setActiveElement("comments");
  });

  const handleCommentClick = (e) => {
    e.preventDefault();
    console.log("Clicked comment");
  };

  useEffect(() => {
    const apiURL = import.meta.env.VITE_API_URL + "/comments";
    fetch(apiURL, { method: "get" })
      .then((response) => {
        if (!response.ok) {
          setError(true);
          if (response.status === 401) {
            setError({
              state: true,
              title: "Unauthorized",
              message: "Please log in before browsing this page",
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
        }
        return response.json();
      })
      .then((actualData) => setBlogData(actualData))
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  return (
    <div className={styles.comments}>
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
                <div className={styles.author} id={id}>
                  {author}
                  <div className={styles.data}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.title}>|</div>
                    <div className={styles.date}>{date}</div>
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
