import styles from "./PostNew.module.css";

const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Submit");
};

function PostNew() {
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
        <input type="checkbox"></input>
        <label>Visible</label>
        </div>
        <input className={styles.submit} type="submit" />
      </form>
    </div>
  );
}

export default PostNew;
