import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';

interface JwtPayload {
  role: string;
}

const withAuth = <P extends object>(
  WrappedComponent: React.FunctionComponent<P>,
  requiredRole?: string
): React.FC<P> => {
  const AuthComponent: React.FC<P> = (props) => {
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
      const token = Cookies.get('token');
      console.log('token:', token);

      if (token) {
        try {
          const decodedToken = jwtDecode<JwtPayload>(token);
          console.log('decodedToken:', decodedToken);
          if (requiredRole && decodedToken.role === requiredRole) {
            setAuthorized(true);
          } else {
            setAuthorized(false);
            window.location.href = '/unauthorized';
          }
        } catch (error) {
          console.error('Error decoding token:', error);
          setAuthorized(false);
          window.location.href = '/unauthorized';}
      } else {
        window.location.href = '/unauthorized';
      }
    }, []);

    if (!authorized) return null;

    return <WrappedComponent {...(props as P)} />;
  };

  return AuthComponent;
};

export default withAuth;
