import { create } from "zustand";
import type { PcPart } from "./api";

type PartStore = {
  editingPart: PcPart | null;
  setEditingPart: (part: PcPart | null) => void;
};

export const usePartStore = create<PartStore>((set) => ({
  editingPart: null,
  setEditingPart: (part) => set({ editingPart: part }),
}));
