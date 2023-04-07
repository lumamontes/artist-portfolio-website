import { createClient } from '../../prismicio';

import Link from 'next/link';
import styles from './home.module.scss';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Head from 'next/head';
import { useState } from 'react';
import { FiCalendar, FiUser } from 'react-icons/fi';
import Footer from '../components/Footer';

export default function Portfolio({ postsPagination }) {
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
      <section>
        <div>
          <img src={'/Logo.svg'} alt="logo" />
        </div>

        <div>
          {posts.results.map(post => (
            <Link href={`/post/${post.uid}`}>
              <div key={post.uid}>
                <h1>{post.data.title}</h1>
                <p>{post.data.subtitle}</p>
                <div >
                  <time>
                    <FiCalendar  />
                    {post.first_publication_date}
                  </time>
                  <p>
                    <FiUser/>
                    Luana
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {posts.next_page && (
          <div className={styles.continueReading}>
            <a onClick={loadMorePosts}>Carregar mais posts</a>
          </div>
        )}
        <Footer />
      </section>
    </>
  );
}

export const getStaticProps = async () => {
  const client = createClient();
  const postsResponse = await client.getByType('displayed_arts_images');
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
          title: post.data.title,
          img: post.data.img
        },
      };
    }),
  };

  return {
    props: {
      postsPagination,
    },
  };
};
