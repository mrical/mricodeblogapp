import Axios from "axios";
import MainWrapper from "../../components/MainWrapper";
import Link from "next/link";

export default function Blog({
  thumbnail,
  body,
  title,
  description,
  lastId,
  nextId,
}) {
  const bodyNew = body
    .split('src="/uploads')
    .join(`src="${process.env.NEXT_PUBLIC_API_URL}/uploads`);
  return (
    <MainWrapper>
      <section className="blog">
        <div
          className="blog__thumbnail"
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}${thumbnail.url})`,
          }}
        ></div>
        <div className="blog__content">
          <h1 className="blog__title">{title}</h1>
          <p className="blog__description">{description}</p>
          <div
            className="blog__body ck-content"
            dangerouslySetInnerHTML={{ __html: bodyNew }}
          ></div>
        </div>
        <div className="blog__share">
          <h2 className="heading-secondary">Share On</h2>
          <div className="blog__share__images">
            <img src="/images/icons/facebook-share.png" alt="facebook" />
            <img src="/images/icons/messenger-share.png" alt="messenger" />
            <img src="/images/icons/twitter-share.png" alt="twitter" />
            <img src="/images/icons/whatsapp-share.png" alt="whatsapp" />
          </div>
        </div>
        <div className="blog__pagination">
          {lastId && (
            <div className="blog__pagination__last">
              <Link href="/blog/[id]" as={`/blog/${lastId}`}>
                <a>
                  <img src="/images/Vector-left.png" alt="left" />
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

                  <img src="/images/Vector-right.png" alt="right" />
                </a>
              </Link>
            </div>
          )}
        </div>
      </section>
    </MainWrapper>
  );
}
export const getServerSideProps = async ({ query }) => {
  const res = await Axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs/${query.id}`
  );
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
