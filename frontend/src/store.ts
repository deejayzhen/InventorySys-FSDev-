import { create } from "zustand";
import type { PcPart } from "./api";

type PartStore = {
  editingPart: PcPart | null;
  setEditingPart: (part: PcPart | null) => void;
  search: string;
  setSearch: (search: string) => void;
  isFormOpen: boolean;
  setFormOpen: (open: boolean) => void;
};

export const usePartStore = create<PartStore>((set) => ({
  editingPart: null,
  setEditingPart: (part) => set({ editingPart: part }),
  search: "",
  setSearch: (search) => set({ search }),
  isFormOpen: false,
  setFormOpen: (open) => set({ isFormOpen: open }),
}));
