import Head from "next/head";
import Slider from "../components/Slider";
import Posts from "../components/Posts";
import MainWrapper from "../components/MainWrapper";
import Axios from "axios";
import { useRouter } from "next/router";
export default function Home({ posts, page, count }) {
  const router = useRouter();
  const {
    query: { category },
  } = router;
  if (router.isFallback) {
    return "Loading...";
  }
  return (
    <>
      <Head>
        <title>MriCode | {category.toUpperCase()}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Slider url={process.env.NEXT_PUBLIC_API_URL} />
      <MainWrapper>
        <Posts posts={posts} page={page} count={count} />
      </MainWrapper>
    </>
  );
}
export async function getStaticPaths() {
  const { data: categories } = await Axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`
  );
  const paths = categories.map((catobj) => `/${catobj.category}`);
  return { paths, fallback: true };
}
export async function getStaticProps({ query, params }) {
  const page = query?.page || 1;
  const category = query?.category || params.category;
  const res = await Axios.get(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/blogs?categories.category=${category}&_sort=updatedAt:DESC&_start=${
      (page - 1) * 10
    }&_limit=10`
  );
  const { data: count } = await Axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs?categories.category=${category}/count`
  );
  return {
    props: {
      posts: res.data,
      page: +page,
      count: +count,
    },
  };
}
