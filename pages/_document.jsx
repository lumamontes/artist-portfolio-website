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
          <meta property="og:url" content="https://luanagoes.vercel.app" />
          <meta property="og:site_name" content="https://luanagoes.vercel.app" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Luana Góes"
        />
        <meta
          property="og:description"
          content="My most recent works, including mixed media, collages, acrylic paintings and drawings."
        />
        <meta property="og:image" content="https://luanagoes.vercel.app/img/bird.png" />
        
        <meta name="twitter:title" content="Luana Góes" />
        <meta name="twitter:description" content="My most recent works, including mixed media, collages, acrylic paintings and drawings." />
        <meta name="twitter:image" content="https://luanagoes.vercel.app/img/bird.png" />
        <meta name="twitter:card" content="summary" />


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