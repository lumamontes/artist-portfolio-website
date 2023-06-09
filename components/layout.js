import React from "react";
import Head from "next/head";
import { NextSeo } from "next-seo";
// import GetImage from "@utils/getImage";
import Navbar from "./navbar";
// import defaultOG from "../public/img/og-default.jpg";

import Footer from "./footer";
// import PopupWidget from "../components/popupWidget";

export default function Layout(props) {
  const { children } = props;
  
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://cdn.sanity.io/" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io//" />
      </Head>
      <NextSeo
        title={props.title}
        description={props.description}
        canonical={props.url}
        openGraph={{
          url: props.url,
          title: props.title,
          description: props.description,
          images: [
            {
              url: '',
              width: 800,
              height: 600,
              alt: props.title
            }
          ],
          site_name: props.title
        }}
        twitter={{
          handle: "@surjithctly",
          site: "@surjithctly",
          cardType: "summary_large_image"
        }}
      />

      <div className="antialiased text-gray-800 flex flex-col min-h-screen">
        <div className="grow">
          <Navbar {...props} />
          <div>{children}</div>
        </div>

        <Footer {...props} />
      </div>
    </>
  );
}
