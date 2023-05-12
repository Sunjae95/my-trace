import { Global } from '@emotion/react';

import { Layout } from '@components';
import { KakaoMapProvider } from '@contexts';
import { globalStyle } from '@styles';

const App = ({ Component, pageProps }) => {
  return (
    <KakaoMapProvider>
      <Global styles={globalStyle} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </KakaoMapProvider>
  );
};

export default App;
