import { create } from "zustand";
import { DataParameters } from "../models/DataParameters";

interface GlobalStore {
    dataParameters: DataParameters | null;
    setDataParameters: (data: DataParameters) => void;
  }
  
  export const useGlobalStore = create<GlobalStore>((set) => ({
    dataParameters: null,
    setDataParameters: (data) => set({ dataParameters: data }),
  }));