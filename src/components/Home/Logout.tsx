import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear sessionStorage
    sessionStorage.clear();
    // Navigate to the home page
    navigate('/');
  }, [navigate]);

  return null;
}
