import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <body className="relative h-screen w-screen overflow-y-auto scroll-smooth dark:bg-gray-950">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
