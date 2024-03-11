import { FC, Suspense, lazy, useContext,  useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import { toast } from 'react-toastify';
import NotFound from 'components/NotFound/NotFound';
import LoadingPage from './components/LoadingPage/LoadingPage';
import Logout from './pages/SignInUp/Logout';
const Store = lazy(() => import('./pages/Store/Store'));
const Game = lazy(() => import('./pages/Game/Game'));
const SignInAndRecovery = lazy(
  () => import('./pages/SignInUp/SignInAndRecovery'),
);
const SignUp = lazy(() => import('./pages/SignInUp/SignUp'));
const UserSettings = lazy(() => import('./pages/UserSettings/UserSettings'));
const UserTags = lazy(() => import('./pages/UserSettings/UserTags'));
const Wishlist = lazy(() => import('pages/UserSettings/Wishlist'));
const Search = lazy(() => import('./pages/Search/Search'));

// import the necessary component styles by default
import './components/Header/Header.scss';
import './components/SecondNavbar/SecondNavbar.scss';
import './components/HoverSummary/HoverSummary.scss';

// Redirect to home page if user is logged in
const RedirectIfLoggedIn: FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      toast.warn('You are already logged in, redirecting to home page...');
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return null;
};

const RedirectIfNotLoggedIn: FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      toast.warn('Please log in first to access this page!');
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return null;
};
const App: FC = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
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
            element={
              <><RedirectIfLoggedIn
                isLoggedIn={isLoggedIn} /><SignUp /></>
            }
          />

          {/* Login route */}
          <Route
            path="/login"
            element={
              <><RedirectIfLoggedIn
                isLoggedIn={isLoggedIn} /><SignInAndRecovery /></>
            }
          />

          {/* Reset password route */}
          <Route
            path="/reset-password"
            element={
              <><RedirectIfLoggedIn
                isLoggedIn={isLoggedIn} /><SignInAndRecovery /></>
            }
          />

          {/* Logout route */}
          <Route path="/logout" element={<Logout />} />

          {/* Tags route */}
          <Route
            path="/user/tags"
            element={
              <><RedirectIfNotLoggedIn
                isLoggedIn={isLoggedIn} /><UserTags /></>
            }
          />

          {/* User settings route */}
          <Route path="/user" element={<Navigate to="/user/settings" />} />
          <Route
            path={'/user/settings'}
            element={
              <><RedirectIfNotLoggedIn
                isLoggedIn={isLoggedIn} /><UserSettings /></>
            }
          />

          {/* Wishlist route */}
          <Route
            path="/wishlist"
            element={
              <><RedirectIfNotLoggedIn
                isLoggedIn={isLoggedIn} /><Wishlist /></>
            }
          />

          {/* Search route */}
          <Route path="/search" element={<Search />} />

          {/* Catch-all route for any other routes */}
          <Route path="*" element={<Navigate to="/notfound" />} />
          <Route path="/notfound" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
