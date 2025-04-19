export interface ToastProps {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}

export const useToast = () => {
  // In a real app, this would be the actual implementation
  return {
    toast: (props: ToastProps) => {
      console.log("Toast:", props);
    },
  };
};
