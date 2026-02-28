
import Image from "next/image"
import fs from "node:fs/promises";
import { getPlaiceholder } from "plaiceholder";

const Hero = async () => {

  const srcMen = '/home/men-banner.webp';
  const srcWomen = '/home/women-banner.webp';

  const bufferMen = await fs.readFile(`./public${srcMen}`);
  const bufferWomen = await fs.readFile(`./public${srcWomen}`);

  const { base64: base64Men } = await getPlaiceholder(bufferMen);
  const { base64: base64Women } = await getPlaiceholder(bufferWomen);

  return (
    <section className='w-full h-160 md:h-screen 2xl:h-115'>
      <div className="w-full 2xl:max-w-[90%] mx-auto h-full gap-[0.5] flex flex-col 2xl:flex-row items-center justify-center font-jost uppercase text-9xl font-medium">
        {/* men banner */}
        <div className="relative w-full 2xl:w-1/2 h-full flex items-center justify-center text-white overflow-hidden">
          <Image
            src={srcMen.replace('./public', '')}
            alt="A man wearing a black hoodie from Clotya"
            title="Men's Banner"
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 1536px) 100vw, 50vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL={base64Men}
          />
          <h1 className="relative z-10 text-7xl md:text-9xl text-transparent text-outline">Men</h1>
        </div>

        {/* women banner */}
        <div className="relative w-full 2xl:w-1/2 h-full flex items-center justify-center text-white overflow-hidden">
          <Image
            src={srcWomen.replace('./public', '')}
            alt="A woman wearing a gown from Clotya"
            title="Women's Banner"
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 1536px) 100vw, 50vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL={base64Women}
          />
          <h1 className="relative z-10 text-7xl md:text-9xl text-transparent text-outline">Women</h1>
        </div>
      </div>
    </section>
  )
}

export default Hero