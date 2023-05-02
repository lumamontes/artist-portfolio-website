import { createClient } from '../prismicio';
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useState } from 'react';
import Layout from "../components/layout";
import Script from 'next/script';


export default function Home({ postsPagination, headingContent, headingResponse }) {
  const [posts, setPosts] = useState(postsPagination);

  const loadMorePosts = async () => {
    const nextPageUrl = posts.next_page;

    if (!nextPageUrl) {
      return;
    }
    const response = await fetch(nextPageUrl);

    const { results, next_page } = await response.json();

    const newPosts = results.map(post => {
      return {
        uid: post.uid,
        first_publication_date: format(
          new Date(post.last_publication_date),
          'dd LLL yyyy',
          {
            locale: ptBR,
          }
        ),
        data: {
          title: post.data.name,
          img: post.data.img.url
        },
      };
    });
    const newPostsWithPagination = {
      results: [...posts.results, ...newPosts],
      next_page,
    };
    setPosts(newPostsWithPagination);
  };

  return (
    <>
     <Layout>
        <main className='max-w-xl mr-auto ml-auto text-center'>
        <PrismicRichText 
          field={headingContent.results[0].data.title}   
          fallback={<p>No content</p>}
      />
        <PrismicRichText field={headingContent.results[0].data.description}fallback={<p>No content</p>}/>
          <div className="grid grid-cols-1 gap-4 ">
            {posts.results.length > 0 && posts.results.map(post => (
                <div key={post.uid} className="group/post transition-opacity  hover:bg-slate-100 hover:opacity-90 hover:pb-6">
                  <img src={post.data.img} alt={post.data.title} className="rounded" />
                  <a className="group/edit invisible group-hover/post:visible ..." >
                    <span className="self-end">{post.data.title}</span>
                  </a>
                </div>
            ))}
            {/* <SliceZone
                slices={headingResponse.results[0].data.slices}
                components={{ 
                  images: ImageSlice
                 }}
                 defaultComponent={ImageSlice}
              /> */}
          </div>
          {posts.next_page && (
            <div className='my-10 underline cursor-pointer'>
              <a onClick={loadMorePosts}>Load more art :)</a>
            </div>
          )}
        </main>
      </Layout>
      {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-WYNBSN3ZMN"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-WYNBSN3ZMN');
        `}
      </Script>
    </>
  );
}
export const getStaticProps = async () => {
  const client = createClient();
  const postsResponse = await client.getByType('displayed_arts_images', {
    pageSize: 10,
    orderings: { 
      field: 'document.first_publication_date', 
      direction: 'desc'
    }
  });

  const headingResponse = await client.getByType('portfolio_page_texts')

  const postsPagination = {
    next_page: postsResponse.next_page,
    results: postsResponse.results.map(post => {
      return {
        uid: post.uid,
        first_publication_date: format(
          new Date(post.last_publication_date),
          'dd LLL yyyy',
          {
            locale: ptBR,
          }
        ),
        data: {
          title: post.data.name,
          img: post.data.img.url
        },
      };
    }),
  };
  
 const headingContent = { results:  headingResponse.results.map(item => {
        return {
          uid: item.uid,
          first_publication_date: format(
            new Date(item.last_publication_date),
            'dd LLL yyyy',
            {
              locale: ptBR,
            }
          ),
          data: {
            title: item.data.title,
            description: item.data.description,
          },
      };
  })
};


  return {
    props: {
      postsPagination,
      headingContent,
      headingResponse
    },
  };
};
