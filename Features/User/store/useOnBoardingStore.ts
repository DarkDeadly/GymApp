import { create } from 'zustand';

interface OnboardingState {
  gender: string;
  height: string;
  weight: string;
  age: string;
  
  // Actions to update individual fields
  setField: (field: keyof Omit<OnboardingState, 'setField' | 'reset'>, value: string) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  gender: "",
  height: "",
  weight: "",
  age: "",
  
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  reset: () => set({ gender: "", height: "", weight: "", age: "" }),
}));