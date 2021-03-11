import Layout from '../components/layout/layout';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      {/* will be overwritten by more specific Head */}
      <Head>
        <title>Next Title</title>
        <meta name='keywords' content='super keyword' />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
