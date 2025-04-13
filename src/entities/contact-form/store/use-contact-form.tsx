import { create } from "zustand";

type ContactFormState = {
  isOpen: boolean;
  openContactForm: () => void;
  closeContactForm: () => void;
  toggleContactForm: () => void;
};

export const useContactFormStore = create<ContactFormState>((set) => ({
  isOpen: false,
  openContactForm: () => set({ isOpen: true }),
  closeContactForm: () => set({ isOpen: false }),
  toggleContactForm: () => set((state) => ({ isOpen: !state.isOpen })),
}));
