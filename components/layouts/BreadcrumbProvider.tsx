"use client";
import { createContext, useContext, useState } from "react";

type BreadcrumbItem = { id: string; label: string };
const BreadcrumbContext = createContext(null);

export function BreadcrumbProvider({ children }) {
  const [title, setTitle] = useState<BreadcrumbItem[]>([]);
  return (
    <BreadcrumbContext.Provider value={{ title, setTitle }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumb() {
  return useContext(BreadcrumbContext);
}
