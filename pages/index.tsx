import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";
import PostCard from "../components/PostCard";
import { sanityClient } from "../sanity";
import { Post } from "../typings";

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  console.log(posts);
  return (
    <div className='mx-auto max-w-7xl'>
      <Head>
        <title>Medium-Clone</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Hero />
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6'>
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type=='post']{
    _id,
    title,
    slug,
    mainImage,
    description,
    
    author -> {
    name,
    image
  }
  }`;

  const posts = await sanityClient.fetch(query);
  return {
    props: {
      posts,
    },
  };
};
