import '../styles/tailwind.css';
import Layout from '../components/Layout';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }:AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
