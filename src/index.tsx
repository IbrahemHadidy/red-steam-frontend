import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css"
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

const container = document.getElementById('app');

if (container) {
  const root = createRoot(container);
  root.render(
      <App />
  );  
}
