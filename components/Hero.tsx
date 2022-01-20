import Image from "next/image";

const Hero = () => {
  return (
    <div className='flex items-center justify-between py-10 bg-yellow-400 border-black lg:py-0 border-y'>
      <div className='px-10 space-y-5'>
        <h1 className='max-w-xl font-serif text-6xl'>
          <span className='underline decoration-black decoration-4'>
            Medium
          </span>{" "}
          is a place to write, read, and connect
        </h1>
        <h2>
          It's easy and free to post your thinking on any topic and connect with
          millions of readers.
        </h2>
      </div>
      <div className='relative hidden w-64 h-64 md:inline-flex lg:h-96 lg:w-96 '>
        <Image
          src='/images/Hero-Image.png'
          layout='fill'
          objectFit='contain'
          alt='Hero-Image'
        />
      </div>
    </div>
  );
};

export default Hero;
