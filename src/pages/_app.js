import { Global } from '@emotion/react';

import { KakaoMapProvider, Layout } from '@components';
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
