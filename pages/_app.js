import { Heading } from '@components/Heading';
import { Text } from '@components/Text';
import { PrismicProvider, PrismicToolbar } from '@prismicio/react';
import Head from 'next/head';
import "../styles/tailwind.css";

function MyApp({ Component, pageProps }) {
  return (
    <PrismicProvider 
    richTextComponents={{
      heading1: ({ children }) => <Heading>{children}</Heading>,
      paragraph: ({ children }) => <Text className="p-4" asChild><p>{children}</p></Text>
    }}
      internalLinkComponent={props => <Link {...props} 

      />} >
      <Head>
        <title>Luana Góes</title>
      </Head>
      <Component {...pageProps} />
    </PrismicProvider>
  );
}

export default MyApp;