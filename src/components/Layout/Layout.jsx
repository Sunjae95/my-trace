import React from 'react';
import styled from '@emotion/styled';
import { Noto_Sans_KR } from 'next/font/google';

const notoSansKorea = Noto_Sans_KR({ weight: ['100', '400', '700'], subsets: ['latin'] });

export const Layout = ({ children }) => {
  return <Container className={notoSansKorea.className}>{children}</Container>;
};

const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
