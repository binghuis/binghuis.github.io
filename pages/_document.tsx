import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <title>Binghuis</title>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <body className="dark:bg-gray-950 w-screen h-screen relative overflow-y-auto overflow-x-hidden">
          <article className="pt-12 pb-32 dark:prose-invert prose relative max-w-4xl mx-auto">
            <Main />
            <NextScript />
          </article>
        </body>
      </Html>
    );
  }
}
