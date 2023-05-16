import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body className="w-screen h-screen relative overflow-y-auto overflow-x-hidden">
          <article className="pt-12 pb-32 prose relative max-w-4xl mx-auto">
            <Main />
            <NextScript />
          </article>
        </body>
      </Html>
    );
  }
}
