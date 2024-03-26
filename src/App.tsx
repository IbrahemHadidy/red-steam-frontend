import { FC, Suspense, lazy, useContext,  useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useSoftNavigate from 'hooks/useSoftNavigate';
import { AuthContext } from './contexts/AuthContext';
import { toast } from 'react-toastify';
import NotFound from 'components/NotFound/NotFound';
import LoadingPage from './components/LoadingPage/LoadingPage';
import Logout from './pages/Auth/Logout'
const Store = lazy(() => import('./pages/Store/Store'));
const Game = lazy(() => import('./pages/Game/Game'));
const SignInAndRecovery = lazy(() => import('./pages/Auth/SignInAndRecovery'));
const SignUp = lazy(() => import('./pages/Auth/SignUp'));
const UserSettings = lazy(() => import('./pages/UserSettings/UserSettings'));
const UserTags = lazy(() => import('./pages/UserSettings/UserTags'));
const Wishlist = lazy(() => import('pages/Shop/Wishlist/Wishlist'));
const Cart = lazy(() => import('pages/Shop/Cart/Cart'));
const Checkout = lazy(() => import('pages/Shop/Checkout/Checkout'));
const Library = lazy(() => import('pages/Shop/GamesLibrary/Library'));
const Search = lazy(() => import('./pages/Search/Search'));

// import the necessary component styles by default
import './components/Header/Header.scss';
import './components/SecondNavbar/SecondNavbar.scss';
import './components/HoverSummary/HoverSummary.scss';

// Redirect to home page if user is logged in
const RedirectIfLoggedIn: FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const navigate = useSoftNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return null;
};

const RedirectIfNotLoggedIn: FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const navigate = useSoftNavigate();

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
              <>
                <RedirectIfLoggedIn isLoggedIn={isLoggedIn} />
                <SignUp />
              </>
            }
          />

          {/* Login route */}
          <Route
            path="/login"
            element={
              <>
                <RedirectIfLoggedIn isLoggedIn={isLoggedIn} />
                <SignInAndRecovery />
              </>
            }
          />

          {/* Forgot password/username route */}
          <Route
            path="/forgot-password"
            element={
              <>
                <RedirectIfLoggedIn isLoggedIn={isLoggedIn} />
                <SignInAndRecovery />
              </>
            }
          />

          {/* reset password route with token param */}
          <Route
            path="/reset-password"
            element={
              <>
                <RedirectIfLoggedIn isLoggedIn={isLoggedIn} />
                <SignInAndRecovery />
              </>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <>
                <RedirectIfLoggedIn isLoggedIn={isLoggedIn} />
                <SignInAndRecovery />
              </>
            }
          />

          {/* Logout route */}
          <Route path="/logout" element={<Logout />} />

          {/* Tags route */}
          <Route
            path="/user/tags"
            element={
              <>
                <RedirectIfNotLoggedIn isLoggedIn={isLoggedIn} />
                <UserTags />
              </>
            }
          />

          {/* User settings route */}
          <Route path="/user" element={<Navigate to="/user/settings" />} />
          <Route
            path={'/user/settings'}
            element={
              <>
                <RedirectIfNotLoggedIn isLoggedIn={isLoggedIn} />
                <UserSettings />
              </>
            }
          />

          {/* Wishlist route */}
          <Route
            path="/wishlist"
            element={
              <>
                <RedirectIfNotLoggedIn isLoggedIn={isLoggedIn} />
                <Wishlist />
              </>
            }
          />

          {/* Cart route */}
          <Route
            path="/cart"
            element={
              <>
                <RedirectIfNotLoggedIn isLoggedIn={isLoggedIn} />
                <Cart />
              </>
            }
          />

          {/* Checkout route */}
          <Route
            path="/checkout"
            element={
              <>
                <RedirectIfNotLoggedIn isLoggedIn={isLoggedIn} />
                <Checkout />
              </>
            }
          />

          {/* Library route */}
          <Route
            path="/library"
            element={
              <>
                <RedirectIfNotLoggedIn isLoggedIn={isLoggedIn} />
                <Library />
              </>
            }
          />

          {/* Search route */}
          <Route path="/search" element={<Search />} />

          {/* Catch-all route for any other routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
