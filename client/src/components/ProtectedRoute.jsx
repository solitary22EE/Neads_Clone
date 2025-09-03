import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export default function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>Loading...</p>;

  // Only allow if logged-in AND is admin
  const allowedAdmins = ["admin@123.com"];

  if (!user || !allowedAdmins.includes(user.email.toLowerCase())) {
    return <Navigate to="/admin" replace />; //  fixed (was /admin-login)
  }

  return children;
}
