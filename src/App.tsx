import {FileProvider} from "./contexts/Files/Provider.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages/Main/MainPage";
import {GeneratorPage} from "./pages/Generator";
import {HistoryPage} from "./pages/History";
import {useContext} from "react";
import {FilesContext} from "./contexts/Files/context.ts";
import type {FilesContextType} from "./contexts/Files/types.ts";
import {initialFiles} from "./contexts/Files/context.ts";

function App() {
    return (
        <FileProvider initialFiles={initialFiles}>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </FileProvider>
    );
}

const AppRoutes = () => {
    const {files, setFiles} = useContext(FilesContext) as FilesContextType;

    return (
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/generate" element={<GeneratorPage />} />
            <Route path="/history" element={<HistoryPage files={files} setFiles={setFiles} />}/>
        </Routes>
    );
};


export default App;
