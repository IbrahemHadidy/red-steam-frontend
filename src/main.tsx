import { createRoot } from 'react-dom/client';
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./main.scss"
import { StrictMode } from 'react';

const container = document.getElementById('root');

if (container) {
	const root = createRoot(container);
	root.render(
		<StrictMode><App /></StrictMode>
	);  
}
