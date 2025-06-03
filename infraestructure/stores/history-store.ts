import { PredictResponse } from "@/infraestructure/api/predict";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface HistoryItem extends PredictResponse {
    id: string;
    date: string; // ISO string para persistencia segura
    image_uri: string;
}

interface HistoryState {
    history: HistoryItem[];
    add: (item: HistoryItem) => void;
    remove: (id: string) => void;
    clear: () => void;
}

export const useHistoryStore = create(
    persist<HistoryState>(
        (set) => ({
            history: [],
            add: (item) =>
                set((state) => ({
                    history: [...state.history, item],
                })),
            remove: (id) =>
                set((state) => ({
                    history: state.history.filter((item) => item.id !== id),
                })),
            clear: () => set({ history: [] }),
        }),
        {
            name: "history-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
