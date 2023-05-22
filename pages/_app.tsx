import '@code-hike/mdx/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/custom-ch.css';
import '../styles/globals.css';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Binghuis</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <div className="prose mx-auto px-4 pb-16 pt-16 laptop:max-w-4xl">
        <article className="dark:prose-invert">
          <Component {...pageProps} />
        </article>
      </div>
    </>
  );
};

export default App;
