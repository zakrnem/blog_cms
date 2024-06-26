import { useState, useEffect } from "react";
import styles from "./PostsDash.module.css";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import editIcon from "/edit-svgrepo-com.svg";

function PostsDash({ setActiveElement, error, setError, setPostURL }) {
  const navigate = useNavigate();

  const page = 1;
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (error.state) navigate("/home");
    setActiveElement("posts");
  });

  const handlePostClick = (e) => {
    e.preventDefault();
    const postId = e.target.parentElement.id;
    setPostURL(import.meta.env.VITE_API_URL + "/posts/" + postId);
    navigate("/editpost");
  };

  const handleNextPage = (e) => {
    e.preventDefault();
    console.log("Clicked next page");
  };

  useEffect(() => {
    const apiURL = import.meta.env.VITE_API_URL + "/posts/page/" + page;
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
        const author = blogData[index].author;
        const id = blogData[index]._id;
        return (
          <div key={key}>
            <div className={styles.post}>
              <Link to="#" onClick={handlePostClick}>
                <div id={id} className={styles.header}>
                  <div className={styles.title}>{title}</div>
                  <img src={editIcon} className={styles.icon} />
                </div>
              </Link>
              <div className={styles.subheader}>
                <div>{author}</div>
                <div>{date}</div>
              </div>
              <div className={styles.summary}>{summary}</div>
              <div className={styles.comments}>Comments: {commentsNumber}</div>
            </div>
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
