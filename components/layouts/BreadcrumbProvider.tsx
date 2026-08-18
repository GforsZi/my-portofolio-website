"use client";
import { createContext, useContext, useState, useCallback } from "react";

type BreadcrumbItem = { id: string; label: string };

type BreadcrumbContextType = {
  items: BreadcrumbItem[];
  register: (item: BreadcrumbItem) => void;
  unregister: (id: string) => void;
};

const BreadcrumbContext = createContext<BreadcrumbContextType | null>(null);

export function BreadcrumbProvider({ children }: { children: React.ReactNode }) {
  const [title, setTitle] = useState<BreadcrumbItem[]>([]);

  const register = useCallback((item: BreadcrumbItem) => {
    setTitle((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) => (i.id === item.id ? item : i));
      }
      return [...prev, item];
    });
  }, []);

  const unregister = useCallback((id: string) => {
    setTitle((prev) => prev.filter((i) => i.id !== id));
  }, []);

  return (
    <BreadcrumbContext.Provider value={{ title, register, unregister }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumb() {
  const ctx = useContext(BreadcrumbContext);
  if (!ctx) throw new Error("useBreadcrumb must be used within BreadcrumbProvider");
  return ctx;
}
