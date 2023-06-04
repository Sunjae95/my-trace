import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { SIGN_IN_PAGE, SIGN_UP_PAGE } from '@constants';
import { auth } from '@utils';

export const AuthorizationContext = createContext(null);

export const AuthorizationProvider = ({ children }) => {
  const { pathname, replace } = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const changeAuthorization = (user) => {
      setIsAuthorized(!!user ? true : false);
      setIsLoading(false);
    };

    const unSubscribe = auth.onAuthStateChanged(changeAuthorization);
    return () => unSubscribe();
  }, []);

  useEffect(() => {
    if (isLoading) return;
    if (isAuthorized || unAuthenticatedRouteList.includes(pathname)) return;

    replace(SIGN_IN_PAGE);
  }, [isLoading, isAuthorized, pathname, replace]);

  return <AuthorizationContext.Provider value={{}}>{children}</AuthorizationContext.Provider>;
};

const unAuthenticatedRouteList = [SIGN_UP_PAGE, SIGN_IN_PAGE];
