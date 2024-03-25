import styles from "./ErrorWindow.module.css";

function ErrorWindow({ error, setError }) {
  const handleDismiss = (e) => {
    setError({ state: false });
    console.log("Error dismissed");
  };

  return (
    <div className={error.state ? styles.active : ""}>
      {error.state && (
        <div className={styles.error}>
          <div className={styles.errorTitle}>{error.title}</div>
          <div className={styles.errorMessage}>{error.message}</div>
          <button onClick={handleDismiss}>Dismiss</button>
        </div>
      )}
    </ div>
  );
}

export default ErrorWindow;
