import { toast as sonnerToast, Toast } from "sonner";

// Define types
type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success";
};

// Create a wrapper function that maps our expected props to Sonner's format
const adaptedToast = (titleOrProps: string | ToastProps, props?: ToastProps) => {
  // If first argument is a string, treat it as the title
  if (typeof titleOrProps === 'string') {
    return sonnerToast(titleOrProps, props);
  }
  
  // Otherwise, extract title and pass the rest as options
  const { title, ...restProps } = titleOrProps;
  return sonnerToast(title || "", restProps);
};

// Add convenience methods that match shadcn/ui toast style while using Sonner underneath
adaptedToast.error = (titleOrProps: string | ToastProps, props?: ToastProps) => {
  if (typeof titleOrProps === 'string') {
    return sonnerToast.error(titleOrProps, props);
  }
  const { title, ...restProps } = titleOrProps;
  return sonnerToast.error(title || "", restProps);
};

adaptedToast.success = (titleOrProps: string | ToastProps, props?: ToastProps) => {
  if (typeof titleOrProps === 'string') {
    return sonnerToast.success(titleOrProps, props);
  }
  const { title, ...restProps } = titleOrProps;
  return sonnerToast.success(title || "", restProps);
};

// Export our adapted toast function
export const toast = adaptedToast;

// Our hook returns the toast function and an empty toasts array for compatibility
export const useToast = () => {
  return {
    toast: adaptedToast,
    toasts: []
  };
};
