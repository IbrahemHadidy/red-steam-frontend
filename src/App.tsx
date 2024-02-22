import { FC, Suspense, lazy, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import LoadingPage from './components/LoadingPage/LoadingPage';
import Logout from './pages/SignInUp/Logout';
const Store = lazy(() => import('./pages/Store/Store'));
const Game = lazy(() => import('./pages/Game/Game'));
const SignInAndRecovery = lazy(() => import('./pages/SignInUp/SignInAndRecovery'));
const SignUp = lazy(() => import('./pages/SignInUp/SignUp'));
const UserTags = lazy(() => import('./pages/UserSettings/UserTags'));
const Search = lazy(() => import('./pages/Search/Search'));

// import the necessary component styles by default
import './components/Header/Header.scss';
import './components/SecondNavbar/SecondNavbar.scss';
import './components/HoverSummary/HoverSummary.scss';

// Redirect to home page if user is logged in 
const RedirectIfLoggedIn: FC<{element: JSX.Element}> = ({ element }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? <Navigate to="/" /> : element;
};

// Redirect to login page if user is not logged in
const RedirectIfNotLoggedIn: FC<{ element: JSX.Element }> = ({ element }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return !isLoggedIn ? <Navigate to="/login" /> : element;
};

const App: FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            {/* Home route */}
            <Route path="/" element={<Store />} />

            {/* Game route */}
            <Route path="/game/:id/*" element={<Game gameId={''} />} />

            {/* Signup route */}
            <Route
              path="/join"
              element={<RedirectIfLoggedIn element={<SignUp />} />}
            />

            {/* Login route */}
            <Route
              path="/login"
              element={<RedirectIfLoggedIn element={<SignInAndRecovery />} />}
            />

            {/* Reset password route */}
            <Route
              path="/reset-password"
              element={<RedirectIfLoggedIn element={<SignInAndRecovery />} />}
            />

            {/* Logout route */}
            <Route path="/logout" element={<Logout />} />

            {/* Tags route */}
            <Route 
              path="/user/tags" 
              element={<RedirectIfNotLoggedIn element={<UserTags />} />} 
            />

            {/* Search route */}
            <Route path="/search" element={<Search />} />

            {/* Catch-all route for any other routes */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
