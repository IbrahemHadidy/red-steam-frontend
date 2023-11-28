import { FC } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Store from "./pages/Store/Store";
import Game from "./pages/Game/Game";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Store />} />
        <Route path="/game/:id/*" element={<Game gameId={''} />} />

        {/* Catch-all route for any other routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;