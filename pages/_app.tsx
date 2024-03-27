import { store } from '@/store';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { QueryParamProvider } from 'use-query-params';
import { NextAdapter } from 'next-query-params';

const App = ({
  Component,
  pageProps,
}: AppProps) => (
  <QueryParamProvider adapter={NextAdapter}>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </QueryParamProvider>
);

export default App;
