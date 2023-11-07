import React, { FC } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Store from "./pages/Store";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Store />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;