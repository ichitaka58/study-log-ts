import { useCallback, useMemo } from "react";
import { toaster } from "@/components/ui/toaster";

export const useToastMessage = () => {
  const toastSuccess = useCallback((title?: string, description?: string) => {
    toaster.create({
      title,
      description,
      type: "success",
      closable: true,
    });
  }, []);

  const toastError = useCallback((title?: string, description?: string) => {
    toaster.create({
      title,
      description,
      type: "error",
      closable: true,
    });
  }, []);

  return useMemo(() => ({ toastSuccess, toastError }), [toastSuccess, toastError]);
};
