import NextDocument, {
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <body className="relative h-screen w-screen overflow-y-auto overflow-x-hidden scroll-smooth dark:bg-slate-950">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
