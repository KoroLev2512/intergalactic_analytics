import {createContext} from "react";
import type { File } from "./types.ts";
import type {FilesContextType} from "./types.ts";

export const initialFiles: File[] = [
    {
        name: 'example1.csv',
        date: '22.10.2023',
        processed: true,
    },
    {
        name: 'example2.csv',
        date: '22.10.2023',
        processed: false,
    }
];


export const FilesContext = createContext<FilesContextType>({
    files: [],
    setFiles: () => {}
});
