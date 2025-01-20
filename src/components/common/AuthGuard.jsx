/**
 * AuthGuard component
 */
const AuthGuard = ({ childrend }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = '/login';
  }

  return childrend;
};

export default AuthGuard;
