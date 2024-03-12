import styles from "./Header.module.css";
import { Link } from "react-router-dom";

function Header() {
  const activeElement = "";
  const setActiveElement = (e) => {
    e.preventDefault();
    console.log("set active");
  };
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <a href="https://github.com/zakrnem/">
          <img src="/laptop-svgrepo-com.svg" />
        </a>
        <div className={styles.title}>Zakrnem's Tech Blog</div>
      </div>
      <div className={styles.links}>
        <Link
          to="login"
          className={activeElement === "login" ? styles.active : ""}
          onClick={() => {
            setActiveElement("login");
          }}
        >
          Login
        </Link>
        <Link
          to="signup"
          className={activeElement === "signup" ? styles.active : ""}
          onClick={() => {
            setActiveElement("signup");
          }}
        >
          Sign up
        </Link>
        <Link
          to="comments"
          className={activeElement === "comments" ? styles.active : ""}
          onClick={() => {
            setActiveElement("comments");
          }}
        >
          Comments
        </Link>
        <Link
          to="posts"
          className={activeElement === "posts" ? styles.active : ""}
          onClick={() => {
            setActiveElement("posts");
          }}
        >
          Posts
        </Link>
      </div>
    </div>
  );
}

export default Header;
