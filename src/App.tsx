import { FC } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Store from "./pages/Store/Store";
import Game from "./pages/Game/Game";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Store />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;