import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Error {error.status}</h1>
        <p>{error.statusText}</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Unexpected Error</h1>
        <p></p>
      </div>
    );
  }
};

export default ErrorPage;
