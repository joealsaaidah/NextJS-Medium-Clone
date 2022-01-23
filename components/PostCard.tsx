import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import { urlFor } from "../sanity";
import { Post } from "../typings";

const PostCard: FunctionComponent<{ post: Post }> = ({ post }) => {
  const authorImageURL = urlFor(post.author.image).url();
  const mainImageURL = urlFor(post.mainImage).url();
  return (
    <Link href={`/posts/${post.slug.current}`}>
      <div className='border rounded-lg group cursor-pointer overflow-hidden'>
        {post.mainImage && (
          <div className='relative h-60 w-full group-hover:scale-105 transition-transform duration-200 ease-in-out'>
            <Image
              layout='fill'
              objectFit='cover'
              src={mainImageURL!}
              alt='post image'
            />
          </div>
        )}
        <div className='flex  justify-between p-5 bg-white'>
          <div>
            <p className='font-bold text-lg'>{post.title}</p>
            <p className='text-xm'>
              {post.description} by {post.author.name}
            </p>
          </div>
          <div className='relative w-12 h-12 rounded-full'>
            <Image
              layout='fill'
              objectFit='contain'
              src={authorImageURL!}
              alt='author image'
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
