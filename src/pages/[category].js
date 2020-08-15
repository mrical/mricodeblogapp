import Head from "next/head";
import Slider from "../components/Slider";
import Posts from "../components/Posts";
import MainWrapper from "../components/MainWrapper";
import Axios from "axios";

export default function Home({ posts, page, count }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Slider url={process.env.NEXT_PUBLIC_API_URL} />
      <MainWrapper>
        <Posts posts={posts} page={page} count={count} />
      </MainWrapper>
    </>
  );
}
export async function getServerSideProps({ query: { page = 1, category } }) {
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
