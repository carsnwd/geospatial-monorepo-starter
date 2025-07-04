import React, { createContext, useContext, useState } from "react";

interface SideMenuToggleContextType {
  isOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
}

const SideMenuToggleContext = createContext<
  SideMenuToggleContextType | undefined
>(undefined);

export const useSideMenuToggle = (): SideMenuToggleContextType => {
  const context = useContext(SideMenuToggleContext);
  if (!context) {
    throw new Error(
      "useSideMenuToggle must be used within a SideMenuToggleProvider",
    );
  }
  return context;
};

export const SideMenuToggleProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <SideMenuToggleContext.Provider
      value={{ isOpen, openMenu, closeMenu, toggleMenu }}
    >
      {children}
    </SideMenuToggleContext.Provider>
  );
};
