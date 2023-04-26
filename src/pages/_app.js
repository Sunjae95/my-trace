import { Global } from '@emotion/react';

import { CurrentProvider, KakaoMapProvider, Layout } from '@components';
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
