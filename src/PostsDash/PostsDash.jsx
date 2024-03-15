import { useState, useEffect } from "react";
import styles from "./PostsDash.module.css";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";

function PostsDash({ setActiveElement }) {
  const page = 1;
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setActiveElement("posts");
  });

  const handlePostClick = (e) => {
    e.preventDefault();
    console.log("Clicked post");
  };
  const handleNextPage = (e) => {
    e.preventDefault();
    console.log("Clicked next page");
  };

  useEffect(() => {
    if (error !== null) console.log(error);
  }, [error]);

  useEffect(() => {
    const apiURL = import.meta.env.VITE_API_URL + "/posts/page/" + page;
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
  }, [page]);

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
        const title = blogData[index].title;
        const summary = blogData[index].summary;
        const date = blogData[index].date;
        const visible = blogData[index].visible;
        const commentsNumber = blogData[index].commentsNumber;
        const id = blogData[index].id;
        return (
          <div key={key}>
            {visible && (
              <div className={styles.post}>
                <Link to="#" onClick={handlePostClick}>
                  <div className={styles.title} id={id}>
                    {title}
                    <div className={styles.date}>{date}</div>
                  </div>
                </Link>
                <div className={styles.summary}>{summary}</div>
                <div className={styles.comments}>
                  Comments: {commentsNumber}
                </div>
              </div>
            )}
          </div>
        );
      })}
      {blogData.length > 0 && (
        <button className={styles.next_page} onClick={handleNextPage}>
          Older posts
        </button>
      )}
    </div>
  );
}

export default PostsDash;
