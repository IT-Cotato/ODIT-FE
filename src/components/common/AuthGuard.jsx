/**
 * AuthGuard component
 */
const AuthGuard = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = '/login';
  }

  return children;
};

export default AuthGuard;
