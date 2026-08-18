"use client";
import { useEffect } from "react";
import { useBreadcrumb } from "@/components/layouts/BreadcrumbProvider";

export function useRegisterBreadcrumb(id: string, label: string) {
  const { register, unregister } = useBreadcrumb();

  useEffect(() => {
    register({ id, label });
    return () => unregister(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, label]);
}
