import { useContext } from 'react';
import { AuthContext } from '../../auth/Context';
import Button from 'react-bootstrap/esm/Button';

export default function LogoutButton() {
  const { logout } = useContext(AuthContext);

  return <Button variant="dark" onClick={logout}>Logout</Button>
}
