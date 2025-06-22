import { create } from "zustand/react";
import { createFilesStore, type FilesStore } from "./files";

export const useStore = create<FilesStore>((set) => createFilesStore(set));