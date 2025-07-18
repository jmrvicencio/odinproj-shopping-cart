import { useSearchParams, useParams, Navigate } from "react-router-dom";
import Store from "./Store";

// Checks whether or not there are search params for store
const StoreRedirect = () => {
  const { page } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("q"));
  console.log(searchParams.has("q"));
  console.log(page);

  if (!searchParams.has("q")) return <Navigate to="1" replace />;
  return <Store />;
};

export default StoreRedirect;
