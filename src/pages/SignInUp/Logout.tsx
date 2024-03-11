import { useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext';

function Logout() {
  const { logout } = useContext(AuthContext);
  logout();
  return null;
}

export default Logout;
