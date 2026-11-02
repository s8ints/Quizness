import { Navigate, useLocation } from "react-router-dom";
import { useStudent } from "../app/StudentProvider";

// The walkable room is now the Home base, so old links lead there.
export function Room() {
  const { preview } = useStudent();
  const { state } = useLocation();
  return (
    <Navigate to={preview ? "/preview" : "/dashboard"} state={state} replace />
  );
}
