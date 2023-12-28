import { FC, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
const Store = lazy(() => import('./pages/Store/Store'));
const Game = lazy(() => import('./pages/Game/Game'));
const SignInAndRecovery = lazy(() => import('./pages/SignInUp/SignInAndRecovery'));
const SignUp = lazy(() => import('./pages/SignInUp/SignUp'));
const Search = lazy(() => import('./pages/Search/Search'));

// import the necessary components by default
import "./components/Header/Header.scss";
import "./components/SecondNavbar/SecondNavbar.scss";

const App: FC = () => {
	return (
		<BrowserRouter>
			<Suspense>
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
			</Suspense>
		</BrowserRouter>
	);
};

export default App;