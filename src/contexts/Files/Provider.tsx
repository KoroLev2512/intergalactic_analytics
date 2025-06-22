import {FilesContext, type FilesContextType} from "./context.ts";
import {type ReactNode} from "react";
import {useStore} from "../../store";

type ProviderProps = {
    children: ReactNode;
};

export const FileProvider = ({ children }: ProviderProps) => {
    const { files, addFile } = useStore();

    return (
        <FilesContext.Provider value={{ files, addFile } as FilesContextType}>
            {children}
        </FilesContext.Provider>
    );
};
