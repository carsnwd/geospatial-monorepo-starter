import React, { createContext, useContext, useState } from "react";

// Define the context type
interface ActiveTabContextType {
  activeTab: string | null;
  setActiveTab: (tab: string | null) => void;
}

// Create the context
const ActiveTabContext = createContext<ActiveTabContextType | undefined>(
  undefined,
);

// Custom hook to use the context
export const useActiveTab = (): ActiveTabContextType => {
  const context = useContext(ActiveTabContext);
  if (!context) {
    throw new Error("useActiveTab must be used within an ActiveTabProvider");
  }
  return context;
};

// Provider component
export const ActiveTabProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  return (
    <ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </ActiveTabContext.Provider>
  );
};
