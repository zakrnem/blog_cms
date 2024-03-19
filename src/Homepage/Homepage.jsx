import LoginForm from "../LoginForm/LoginForm";
import PostsDash from "../PostsDash/PostsDash";

function Homepage({
  setActiveElement,
  auth,
  error,
  setError,
  errorMessage,
  setErrorMessage,
}) {
  return (
    <>
      {auth && (
        <PostsDash
          setActiveElement={setActiveElement}
          error={error}
          setError={setError}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
      {!auth && (
        <LoginForm
          setActiveElement={setActiveElement}
          error={error}
          setError={setError}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
    </>
  );
}

export default Homepage;
