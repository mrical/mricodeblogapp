import React, { useEffect, useState } from "react";
import Axios from "axios";
import Link from "next/link";
export default function SidePosts({ type }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await Axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs?categories.category=${type}&_sort=updatedAt:DESC&_limit=2`
      );
      const firstTwo = res.data;
      setPosts(firstTwo);
    };
    fetchData();
  }, []);
  return (
    <section className="SidePosts">
      <h2 className="SidePosts__heading heading-secondary">{type}</h2>
      <div className="SidePosts__posts">
        {posts.map((post) => (
          <div className="SidePosts__post" key={post.id}>
            <Link href="/blog/[id]" as={`/blog/${post.id}`}>
              <div
                className="SidePosts__post__thumbnail"
                style={{
                  backgroundImage: `linear-gradient(to bottom,transparent,rgba(0,0,0,.7)), url(${process.env.NEXT_PUBLIC_API_URL}${post.thumbnail.url})`,
                }}
              >
                <div className="SidePosts__post__title">{post.title}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Link href={`/${type}`}>
        <a className="SidePosts__btn btn-secondary btn-secondary--purple">
          See More
        </a>
      </Link>
    </section>
  );
}
