import {createContext} from "react";
import type { File } from "./types.ts";
import type {FilesStore} from "../../store/files";

export const initialFiles: File[] = JSON.parse(localStorage.getItem("uploadedFiles") || "[]");

export const FilesContext = createContext<FilesContextType>({
    files: initialFiles,
    setFiles: () => {},
    addFile: () => {}
});

export type FilesContextType = FilesStore;