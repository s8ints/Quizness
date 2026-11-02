import { Navigate } from "react-router-dom";
import { useStudent } from "../app/StudentProvider";

// The walkable room is now the Home base, so old links lead there.
export function Room() {
  const { preview } = useStudent();
  return <Navigate to={preview ? "/preview" : "/dashboard"} replace />;
}
