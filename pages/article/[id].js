import Image from "next/image.js";
import Layout from "../../components/Layout.js";
import { fetcher } from "../../lib/api.js";

const article = ({ article }) => {
  const imageURL = `${process.env.NEXT_PUBLIC_HOST}${article.data.attributes.mainPhoto.data.attributes.url}`;

  const date = new Date(article.data.attributes.date)
    .toDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .replace(/(\S+)\s+(\S+\s+\S+)/, "$1, $2,");

  return (
    <Layout>
      <article>
        <div className="relative w-full h-[600px]">
          <Image src={imageURL} layout="fill" objectFit="cover" />
        </div>

        <div className="px-2 md:px-4 lg:px-12">
          <span className="italic text-gray-500 block my-2">{date}</span>
          <h1 className="text-5xl py-4 text-center text-gray-800">
            {article.data.attributes.title}
          </h1>
          <p className="text-lg leading-7">{article.data.attributes.article}</p>
        </div>
      </article>
    </Layout>
  );
};

export default article;

export async function getServerSideProps(context) {
  const article = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/articles/${context.query.id}?populate=*`
  );

  return {
    props: {
      article,
    },
  };
}
