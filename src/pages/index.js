import React, { useContext, useEffect, useRef } from 'react';
import styled from '@emotion/styled';

import { KakaoMapContext } from '@components';

const Home = () => {
  const ref = useRef(null);
  const map = useContext(KakaoMapContext);

  useEffect(() => {
    if (!map.isLoading && ref.current) {
      kakao.maps.load(() => {
        const options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

        new kakao.maps.Map(ref.current, options);
      });
    }
  }, [map]);

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

const Title = styled.h1`
  color: red;
  fontsize: 100px;
`;
