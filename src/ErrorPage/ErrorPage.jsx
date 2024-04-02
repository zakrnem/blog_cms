import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.css";

function ErrorPage() {
  return (
    <div className={styles.container}>
      <h1>Oops!</h1>
      <p>
        The page you're looking for doesn't seem to exist. Please check the URL
        and try again.
      </p>
      <Link to="home">Return to homepage</Link>
    </div>
  );
}

export default ErrorPage;
