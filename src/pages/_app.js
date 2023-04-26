import { Global } from '@emotion/react';

import { Layout } from '@components';
import { CurrentProvider, KakaoMapProvider } from '@contexts';
import { globalStyle } from '@styles';

const App = ({ Component, pageProps }) => {
  return (
    <KakaoMapProvider>
      <CurrentProvider>
        <Global styles={globalStyle} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CurrentProvider>
    </KakaoMapProvider>
  );
};

export default App;
