import { useContext, useEffect, useState } from 'react';

import { AuthorizationContext } from '@contexts';
import { auth } from '@utils';

export const useUserInfo = () => {
  const { isAuthorized } = useContext(AuthorizationContext);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!isAuthorized || !auth.currentUser) return;

    setUserInfo({ id: auth.currentUser.uid, email: auth.currentUser.email });
  }, [isAuthorized]);

  return { userInfo };
};
