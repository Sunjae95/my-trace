import React, { useContext, useEffect, useRef } from 'react';

import { KakaoMapContext } from '@components';

const Home = () => {
  const ref = useRef(null);
  const { isLoadingSDK, handleDrawMap } = useContext(KakaoMapContext);

  useEffect(() => {
    if (isLoadingSDK) return;

    handleDrawMap(ref.current);
  }, [isLoadingSDK, handleDrawMap]);

  return (
    <main>
      <div
        ref={ref}
        style={{ width: '500px', height: '400px' }}
      ></div>
    </main>
  );
};

export default Home;
