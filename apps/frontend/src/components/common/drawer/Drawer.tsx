import React, { useEffect } from "react";
import Portal from "./Portal";
import "./Drawer.css";

export default function Drawer({
  open,
  onClose,
  children,
  width = 360,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: number;
}) {
  // when hit the escape key, close the drawer
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <Portal>
      <div className="drawer-backdrop" />
      <aside
        className="drawer-panel"
        style={{ width }}
        role="dialog"
        aria-modal="true"
      >
        <button className="drawer-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className="drawer-content">{children}</div>
      </aside>
    </Portal>
  );
}
