import React from 'react';
import styled from '@emotion/styled';
import { Noto_Sans_KR } from 'next/font/google';

const notoSansKorea = Noto_Sans_KR({ weight: ['100', '400', '700'], subsets: ['latin'] });

export const Layout = ({ children }) => {
  return (
    <Container className={notoSansKorea.className}>
      <Wrapper>{children}</Wrapper>
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
