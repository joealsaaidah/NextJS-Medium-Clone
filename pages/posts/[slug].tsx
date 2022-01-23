import { GetStaticProps } from "next";
import Image from "next/image";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";
import PortableText from "react-portable-text";

interface Props {
  post: Post;
}

const post = ({ post }: Props) => {
  const postImageURL = urlFor(post.mainImage).url();
  const authorImageURL = urlFor(post.author.image).url();

  return (
    <main>
      <div className='relative h-64 w-full '>
        <Image
          layout='fill'
          objectFit='cover'
          src={postImageURL!}
          alt='Post Image'
        />
      </div>
      <article className='max-w-3xl mx-auto p-5'>
        <h1 className='text-3xl mt-10 mb-3'>{post.title}</h1>
        <h2 className='text-xl font-light text-gray-500 mb-2'>
          {post.description}
        </h2>
        <div className='flex items-center space-x-2'>
          <div className='relative w-10 h-10 rounded-full'>
            <Image
              src={authorImageURL!}
              layout='fill'
              objectFit='contain'
              alt='author image'
            />
          </div>
          <p className='font-extralight text-sm'>
            Blog post by{" "}
            <span className='text-green-600'>{post.author.name}</span> -
            Published at {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>
        <div className='mt-10'>
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1 className='text-2xl font-bold my-5' {...props} />
              ),
              h2: (props: any) => (
                <h2 className='text-xl font-bold my-5' {...props} />
              ),
              li: ({ children }: any) => (
                <li className='mt-4 list-disc'>{children}</li>
              ),
              link: ({ href, children }: any) => (
                <a href={href} className='text-blue-500 hover:underline'>
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </article>
      <br className='max-w-lg mx-auto border border-yellow-500' />
    </main>
  );
};

export default post;

export const getStaticPaths = async () => {
  const query = `*[_type=='post']{_id,slug,}`;
  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: { slug: post.slug.current },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type=='post' && slug.current == $slug][0]{
    _id,
  _createdAt,
    title,
    slug,
    mainImage,
    description,
  body,
    
    author -> {
    name,
    image
  }
  }`;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    revalidate: 86400,
  };
};