import "../styles/auth.css";
import "../styles/chats.css";
import "../styles/index.css";
import '../styles/loading.css';
import "../styles/cta.css";

import { ContextProvider } from '../context';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="../styles/global.css" />
      </Head>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </>
  );
}
