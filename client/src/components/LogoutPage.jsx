// LogoutButton.js
import { useLogin } from '../components/Context/LoginContext';
import { logout } from '../API/users'; // Create this function to make a request to the logout route

export default function LogoutButton() {
  const { isLoggedIn, setIsLoggedIn, setUserId, setUserName } = useLogin();

  const handleLogout = async () => {
    try {
      await logout(); // Implement the logout function to make a request to the logout route
      setIsLoggedIn(false);
      setUserId(null);
      setUserName(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    isLoggedIn && (
      <button onClick={handleLogout}>Logout</button>
    )
  );
}