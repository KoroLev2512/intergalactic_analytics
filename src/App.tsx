import { FileProvider } from './contexts/Files/Provider.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main/MainPage';
import { GeneratorPage } from './pages/Generator';
import { HistoryPage } from './pages/History';

function App() {
  return (
    <FileProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </FileProvider>
  );
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/generate" element={<GeneratorPage />} />
      <Route path="/history" element={<HistoryPage />} />
    </Routes>
  );
};

export default App;
