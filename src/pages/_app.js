import { Global } from '@emotion/react';

import { Layout } from '@components';
import { AuthorizationProvider, KakaoMapProvider } from '@contexts';
import { globalStyle } from '@styles';

const App = ({ Component, pageProps }) => {
  return (
    <KakaoMapProvider>
      <AuthorizationProvider>
        <Global styles={globalStyle} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthorizationProvider>
    </KakaoMapProvider>
  );
};

export default App;
