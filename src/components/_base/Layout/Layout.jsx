import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { Noto_Sans_KR } from 'next/font/google';
import { useRouter } from 'next/router';

import { SIGN_IN_PAGE, SIGN_UP_PAGE } from '@constants';

const notoSansKorea = Noto_Sans_KR({ weight: ['100', '400', '700'], subsets: ['latin'] });

export const Layout = ({ children }) => {
  const { pathname } = useRouter();

  const isAuthPage = useMemo(() => [SIGN_IN_PAGE, SIGN_UP_PAGE].includes(pathname), [pathname]);

  return (
    <Container className={notoSansKorea.className}>
      {isAuthPage ? <>{children}</> : <Wrapper>{children}</Wrapper>}
    </Container>
  );
};

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Wrapper = styled.div`
  position: relative;
  height: 100%;

  @media screen and (min-width: 1024px) {
    width: 600px;
  }

  @media screen and (max-width: 1023px) {
    width: 390px;
  }

  @media screen and (max-width: 390px) {
    width: 100%;
  }
`;
