"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Snackbar, SnackbarProps } from "./snackbar";

type SnackbarContextType = {
  showSnackbar: (message: string, variant?: SnackbarProps["variant"]) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error(
      "Invalid to call useSnackbar, current component is not wrapping in SnackbarProvider, or context is undefined"
    );
  }
  return context;
};

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const handleClose = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const [snackbar, setSnackbar] = useState<SnackbarProps>({
    open: false,
    message: "",
    variant: "default",
    onClose: handleClose,
  });

  const showSnackbar = useCallback(
    (message: string, variant: SnackbarProps["variant"] = "default") => {
      setSnackbar({ open: true, message, variant, onClose: handleClose });
    },
    []
  );

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        variant={snackbar.variant}
        onClose={handleClose}
      />
    </SnackbarContext.Provider>
  );
};
