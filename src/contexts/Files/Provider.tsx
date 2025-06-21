import {FilesContext} from "./context.ts";
import type {File} from "./types.ts";
import {type ReactNode, useState} from "react";

type ProviderProps = {
    children: ReactNode;
    initialFiles?: File[];
};

export const FileProvider = ({children, initialFiles = []}: ProviderProps) => {
    const [files, setFiles] = useState<File[]>(initialFiles);

    return (
        <FilesContext.Provider value={{files, setFiles}}>
            {children}
        </FilesContext.Provider>
    );
};
