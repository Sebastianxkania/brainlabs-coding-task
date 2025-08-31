// components/Popup.tsx
"use client"; 

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type PopupProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children }) => {
  const [mounted, setMounted] = useState(false);

  // Only render the portal on the client
  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  if (!mounted || !isOpen) {
    return null;
  }

  // Lazily create a portal root if it doesn’t exist
  let portalRoot = document.getElementById("popup-portal-root");
  if (!portalRoot) {
    portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", "popup-portal-root");
    document.body.appendChild(portalRoot);
  }

  // This wrapper catches outside‐clicks
  const backdropClickHandler = () => {
    onClose();
  };

  // This wrapper prevents clicks inside the content from bubbling up
  const contentClickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const popupElement = (
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={backdropClickHandler}
    >
      {/* Backdrop (covers the whole viewport) */}
      <div className="absolute inset-0 bg-black opacity-50" />

      {/* Popup content itself */}
      <div
        className="relative shadow-xl z-10"
        onClick={contentClickHandler}
      >
        {children}
      </div>
    </div>
  );

  return createPortal(popupElement, portalRoot);
};
