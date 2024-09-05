import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const Logout = () => {
  const router = useRouter();
  const { logout } = useContext(AuthContext); // Access logout from AuthContext

  const handleLogout = async () => {
    try {
      await logout(); // Use the logout function from AuthContext
      router.push('/login'); // Redirect to the login page or another page
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div>
      <h1>Logout</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
