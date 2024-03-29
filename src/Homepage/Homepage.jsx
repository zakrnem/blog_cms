import LoginForm from "../LoginForm/LoginForm";
import PostsDash from "../PostsDash/PostsDash";

function Homepage({ setActiveElement, auth, error, setError, setPostURL }) {
  return (
    <>
      {auth && (
        <PostsDash
          setActiveElement={setActiveElement}
          error={error}
          setError={setError}
          setPostURL={setPostURL}
        />
      )}
      {!auth && (
        <LoginForm
          setActiveElement={setActiveElement}
          error={error}
          setError={setError}
        />
      )}
    </>
  );
}

export default Homepage;
