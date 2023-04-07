import Container from "@components/container";
import Layout from "@components/layout";
import { Text } from "@components/Text";
import { PrismicRichText } from "@prismicio/react";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
// import { authorsquery, configQuery } from "@lib/groq";
// import { getClient } from "@lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "prismicio";

export default function About({ author, siteconfig }) {
    console.log(author)
  return (
    <Layout {...siteconfig}>
      <Container>
        <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
          About
        </h1>
        <div className="text-center">
            <PrismicRichText field={author?.results[0].data?.small_description} />
        </div>

        <div className="grid grid-cols-1 rounded gap-5">
              <div
                key={author.uid}
                className="rounded-md aspect-square odd:translate-y-10 odd:md:translate-y-16 mb-6">
                <Image
                  src={author.results[0].data.img_url}
                  alt={author.results[0].data.name || " "}
                  layout="fill"
                  objectFit="cover "
                  sizes="(max-width: 320px) 600px, 320px"
                />
              </div>
        </div>

        <div className="mx-auto prose text-center dark:prose-invert mt-14 leading-loose">
          {/* <PrismicRichText field={author?.results[0].data?.name} /> */}
          <PrismicRichText field={author?.results[0].data?.about} components={
            {
                paragraph: ({ children }) => <Text size="lg" asChild><p>{children}</p></Text>
            }
          } />
          <small className="text-gray-500"><em>Atualizado em {author.results[0]?.last_publication_date}</em></small>
          <p>
            <Link href="/contact">Get in touch</Link>
          </p>
        </div>
      </Container>
    </Layout>
  );
}

export const getStaticProps = async () => {
    const client = createClient();
    const aboutResponse = await client.getByType('author');
    const author = {
        results: aboutResponse.results.map(post => {
          return {
            uid: post.uid,
            last_publication_date: format(
              new Date(post.last_publication_date),
              'dd LLL yyyy',
              {
                locale: ptBR,
              }
            ),
            data: {
              name: post.data.name,
              about: post.data.about,
              small_description: post.data.small_description,
              img_url: post.data.image.url,
            },
          };
        }),
      };
  
    return {
      props: {
        author,
      },
    };
  };
