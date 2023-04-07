import { createClient } from '../prismicio';

import { PrismicRichText } from "@prismicio/react";

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Head from 'next/head';
import { useState } from 'react';
// import { FiCalendar, FiUser } from 'react-icons/fi';
import Layout from "../components/layout";
import { Heading } from '@components/Heading';
import { Text } from '@components/Text';

export default function Home({ postsPagination, headingContent }) {
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
          title: post.data.title,
          subtitle: post.data.subtitle,
          author: post.data.author,
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
      <Head>
        <title>Luana Góes</title>
      </Head>
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
          </div>
          {posts.next_page && (
            <div>
              <a onClick={loadMorePosts}>Carregar mais artezinhas :)</a>
            </div>
          )}
        </main>
      </Layout>
    </>
  );
}
export const getStaticProps = async () => {
  const client = createClient();
  const postsResponse = await client.getByType('displayed_arts_images');

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
      headingContent
    },
  };
};
