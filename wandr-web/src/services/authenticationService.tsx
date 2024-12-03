import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';

type DecodedToken = {
  role: string;
};

function withAuth<P>(
  WrappedComponent: React.ComponentType<P>,
  requiredRole?: string
): React.FC<P> {
  const AuthComponent: React.FC<P> = (props) => {
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
      const token = Cookies.get('accessToken'); // Adjust the key if necessary
      if (token) {
        try {
          const decoded: { role: string } = jwtDecode(token);
          if (!requiredRole || decoded.role === requiredRole) {
            setAuthorized(true);
          } else {
            window.location.href = '/api/unauthorized';
          }
        } catch (error) {
          console.error('Error decoding token:', error);
          window.location.href = '/api/unauthorized';
        }
      } else {
        window.location.href = '/api/unauthorized';
      }
    }, []);

    if (!authorized) return null;
    return <WrappedComponent {...(props as P)} />;
  };

  return AuthComponent;
}

export default withAuth;
