import React from 'react';
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import SecondNavbar from "./components/SecondNavbar";
import Featured from "./components/Featured";
import Offers from "./components/Offers"

const App: React.FC = () => {
  return (
    <div className="main">
      <Header />
      <Sidebar />
      <SecondNavbar />
      <Featured />
      <Offers />
    </div>
  );
};

export default App;