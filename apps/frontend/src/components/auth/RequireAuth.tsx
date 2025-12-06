import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { PropsWithChildren } from "react";

export function RequireAuth({ children }: PropsWithChildren) {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
}