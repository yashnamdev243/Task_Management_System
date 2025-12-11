// import { Navigate } from "react-router-dom";

// export default function AdminRoute({ children }) {
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!user || user.role !== "admin") {
//     return <Navigate to="/not-authorized" replace />;
//   }

//   return children;
// }


import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const { user } = useSelector((state) => state.auth);

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

