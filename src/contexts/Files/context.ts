import {createContext} from "react";
import type { File } from "./types.ts";
import type {FilesContextType} from "./types.ts";

export const initialFiles: File[] = JSON.parse(localStorage.getItem("uploadedFiles") || "[]");


export const FilesContext = createContext<FilesContextType>({
    files: initialFiles,
    setFiles: () => {}
});
