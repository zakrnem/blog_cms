import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ErrorPage({
  setActiveElement,
  error,
  setError,
  errorMessage,
  setErrorMessage,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    setActiveElement("");
    if (!error) navigate("/home")
  });

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{errorMessage.title}</p>
      <p>{errorMessage.message}</p>
    </div>
  );
}

export default ErrorPage;
