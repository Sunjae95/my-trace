import { Global } from '@emotion/react';
import { Noto_Sans_KR } from 'next/font/google';

import { KakaoMapProvider } from '@components';
import { globalStyle } from '@styles';

const notoSansKorea = Noto_Sans_KR({ weight: ['100', '400', '700'], subsets: ['latin'] });

const App = ({ Component, pageProps }) => {
  return (
    <KakaoMapProvider>
      <Global styles={globalStyle} />
      <main className={notoSansKorea.className}>
        <Component {...pageProps} />
      </main>
    </KakaoMapProvider>
  );
};

export default App;
