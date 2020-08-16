import Axios from "axios";
import MainWrapper from "../../components/MainWrapper";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Blog({
  thumbnail,
  body,
  title,
  description,
  lastId,
  nextId,
}) {
  const router = useRouter();
  if (router.isFallback) {
    return "Loading...";
  }
  // const bodyNew = body
  //   .split('src="/uploads')
  //   .join(`src="${process.env.NEXT_PUBLIC_API_URL}/uploads`);
  return (
    <MainWrapper>
      <section className="blog">
        <div
          className="blog__thumbnail"
          style={{
            backgroundImage: `url(${thumbnail.url})`,
          }}
        ></div>
        <div className="blog__content">
          <h1 className="blog__title">{title}</h1>
          <p className="blog__description">{description}</p>
          <div
            className="blog__body ck-content"
            dangerouslySetInnerHTML={{ __html: body }}
          ></div>
        </div>
        <div className="blog__share">
          <h2 className="heading-secondary">Share On</h2>
          <div className="blog__share__images">
            <a href="https://www.instagram.com/mrical_singhal/" target="_blank">
              <img
                src="https://res.cloudinary.com/dkis5gxl8/image/upload/v1597541871/facebook_share_tljwvq.png"
                alt="facebook"
              />
            </a>
            <a href="https://www.instagram.com/mrical_singhal/" target="_blank">
              <img
                src="https://res.cloudinary.com/dkis5gxl8/image/upload/v1597541871/messenger_share_ripheq.png"
                alt="messenger"
              />
            </a>
            <a href="https://www.instagram.com/mrical_singhal/" target="_blank">
              <img
                src="https://res.cloudinary.com/dkis5gxl8/image/upload/v1597541871/twitter_share_an0ar5.png"
                alt="twitter"
              />
            </a>
            <a href="https://www.instagram.com/mrical_singhal/" target="_blank">
              <img
                src="https://res.cloudinary.com/dkis5gxl8/image/upload/v1597541871/whatsapp_share_gj0tbp.png"
                alt="whatsapp"
              />
            </a>
          </div>
        </div>
        <div className="blog__pagination">
          {lastId && (
            <div className="blog__pagination__last">
              <Link href="/blog/[id]" as={`/blog/${lastId}`}>
                <a>
                  <img
                    src="https://res.cloudinary.com/dkis5gxl8/image/upload/v1597546336/Vector-left_lkaemv.png"
                    alt="left"
                  />
                  <span>last blog</span>
                </a>
              </Link>
            </div>
          )}
          {nextId && (
            <div className="blog__pagination__next">
              <Link href="/blog/[id]" as={`/blog/${nextId}`}>
                <a>
                  <span>next blog</span>

                  <img
                    src="https://res.cloudinary.com/dkis5gxl8/image/upload/v1597546336/Vector-right_xk6usp.png"
                    alt="right"
                  />
                </a>
              </Link>
            </div>
          )}
        </div>
      </section>
    </MainWrapper>
  );
}
export async function getStaticPaths() {
  const { data: blogs } = await Axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs?_limit=15`
  );
  const paths = blogs.map((blog) => `/blog/${blog.id}`);
  return { paths, fallback: true };
}
export const getStaticProps = async ({ query, params }) => {
  const { id } = query || params;
  const res = await Axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`);
  const {
    data: [{ id: nextId } = { id: null }],
  } = await Axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs?updatedAt_gt=${res.data.updatedAt}&_sort=updatedAt:ASC&_limit=1`
  );
  const {
    data: [{ id: lastId } = { id: null }],
  } = await Axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs?updatedAt_lt=${res.data.updatedAt}&_sort=updatedAt:DESC&_limit=1`
  );
  return { props: { ...res.data, nextId, lastId } };
};
