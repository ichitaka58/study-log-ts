import { toaster } from "@/components/ui/toaster";

export const useToastMessage = () => {
  const toastSuccess = (title?: string, description?: string) => {
    toaster.create({
      title,
      description,
      type: "success",
      closable: true,
    });
  };

  const toastError = (title?: string, description?: string) => {
    toaster.create({
      title,
      description,
      type: "error",
      closable: true,
    });
  };

  return { toastSuccess, toastError };
};
