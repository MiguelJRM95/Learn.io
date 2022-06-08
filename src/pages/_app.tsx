import '../utils/styles/globals.css';
import type { AppProps } from 'next/app';
import { AppProvider } from '../providers/app';

function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider {...pageProps}>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default App;
