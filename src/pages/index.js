import styles from '@styles/Home.module.css';
import styled from '@emotion/styled';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const Home = () => {
  return (
    <main className={styles.main}>
      <Title>hello world</Title>
    </main>
  );
};

export default Home;

const Title = styled.h1`
  color: red;
  fontsize: 100px;
`;
