import { KakaoMapProvider } from '@components';

const App = ({ Component, pageProps }) => {
  return (
    <KakaoMapProvider>
      <Component {...pageProps} />
    </KakaoMapProvider>
  );
};

export default App;
