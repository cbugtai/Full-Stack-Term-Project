import React from "react";
import ReactDOM from "react-dom";

// use the portal to render children into a DOM node outside the parent component's DOM hierarchy
export default function Portal({ children }: { children: React.ReactNode }) {
  const element = document.getElementById("modal-root");
  if (!element) return null;
  return ReactDOM.createPortal(children, element);
}
