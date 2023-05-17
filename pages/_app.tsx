import '@code-hike/mdx/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Binghuis</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </Head>
      <div className="prose mx-auto px-8 pb-16 pt-8 md:max-w-4xl">
        <article className="dark:prose-invert">
          <Component {...pageProps} />
        </article>
      </div>
    </>
  );
};

export default App;
