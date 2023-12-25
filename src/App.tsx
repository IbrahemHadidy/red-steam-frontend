import { FC } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Store from "./pages/Store/Store";
import Game from "./pages/Game/Game";
import SignInAndRecovery from './pages/SignInUp/SignInAndRecovery';
import SignUp from './pages/SignInUp/SignUp';
import Search from './pages/Search/Search';

const App: FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				{/* Home route */}
				<Route path="/" element={<Store />} />

				{/* Game route */}
				<Route path="/game/:id/*" element={<Game gameId={''} />} />

				{/* Join route */}
				<Route path="/join" element={<SignUp />} />

				{/* Login route */}
				<Route path="/login" element={<SignInAndRecovery />} />
				<Route path="/reset-password" element={<SignInAndRecovery />} />

				{/* Search route */}
				<Route path="/search" element={<Search />} />

				{/* Catch-all route for any other routes */}
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;