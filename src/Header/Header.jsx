import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";

function Header({ activeElement, setActiveElement, auth, setAuth, user }) {
  const navigate = useNavigate();

  const handleSignout = () => {
    const apiURL = import.meta.env.VITE_API_URL + "/logout";
    fetch(apiURL, {
      method: "post",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setAuth(false);
        navigate("/login");
      });
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
        {auth && (
          <>
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
            <Link
              to="newpost"
              className={activeElement === "newpost" ? styles.active : ""}
              onClick={() => {
                setActiveElement("newpost");
              }}
            >
              New Post
            </Link>
            <Link
              to="#"
              className={`${styles.account} ${activeElement === "user" ? styles.active : ""}`}
            >
              <img src="./user-svgrepo-com.svg" className={styles.userlogo} />
              {user.fullname}
            </Link>
            <Link to="#" onClick={handleSignout}>
              Sign out
            </Link>
          </>
        )}
        {!auth && (
          <>
            <Link
              to="login"
              className={activeElement === "login" ? styles.active : ""}
            >
              Log in
            </Link>
            <Link
              to="signup"
              className={activeElement === "signup" ? styles.active : ""}
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
