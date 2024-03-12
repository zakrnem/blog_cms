import styles from "./SignupForm.module.css"

function SignupForm() {
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Submit")
    }
    return (
        <div className={styles.signup}>
          <div className={styles.title}>Create an account</div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div>
              <label htmlFor="firstName">First Name: </label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name: </label>
              <input type="text" id="lastName" placeholder="Enter your last name" />
            </div>
            <div>
              <label htmlFor="username">Username: </label>
              <input type="text" id="username" placeholder="Enter your username" />
            </div>
            <div>
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
              />
            </div>
            <input className={styles.submit} type="submit" />
          </form>
        </div>
      );
}

export default SignupForm