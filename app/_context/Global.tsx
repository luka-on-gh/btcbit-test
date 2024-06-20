"use client";

import { useContext, useState, createContext } from "react";

// Context definition with typed properties
interface GlobalContextValue {
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlobalContext = createContext<GlobalContextValue>({
  authenticated: false,
  setAuthenticated: () => {}, // Placeholder for actual function
});

// Provider component with typed props
export function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  // Provide the actual authenticated value and setter function
  const contextValue: GlobalContextValue = {
    authenticated,
    setAuthenticated,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
}

// Consumer hook with type checking
export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
}
