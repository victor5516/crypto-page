import './App.css';

import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import  Dashboard  from "./pages/dashboard";
import TopBar from "./pages/global/Topbar";
function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">

        <main className="content">
        <TopBar  />
          <Routes>
            <Route path="/" element={<Dashboard />} />

          </Routes>
        </main>
      </div>
    </ThemeProvider>
  </ColorModeContext.Provider>

  );
}

export default App;
