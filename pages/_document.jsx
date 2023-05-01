import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Luana Góes - Portfolio"
          />
          <meta property="og:url" content="https://luanagoes.vercel.app/" />
          <meta property="og:site_name" content="luanagoes.vercel.app/" />
        <meta property="og:type" content="website" />
          <meta
          property="og:title"
          content="Luana Góes"
        />
        <meta property="og:title" content="Katelyn Nee's photography portfolio" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Luaninha" />
        <meta
          property="og:description"
          content="Portfolio"
        />
        <meta property="og:image" content="https://luanagoes.vercel.app/img/bird.png" />
        </Head>
        <body className="antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument