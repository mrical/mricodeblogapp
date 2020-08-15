import React, { useEffect, useState } from "react";

import Post from "./Post";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Posts({ posts, page, count }) {
  const router = useRouter();
  return (
    <section className="posts">
      {posts.map((post) => (
        <Post
          title={post.title}
          description={post.description}
          thumbnail={post.thumbnail}
          id={post.id}
          key={post.id}
        />
      ))}
      <div className="pagination">
        {page > 1 && (
          <img
            src="images/Vector-left.svg"
            alt="left"
            onClick={() => router.push(`/?page=${page - 1}`)}
            className="pagination__left"
          />
        )}
        {page >= 1 && <div className="pagination__current">{page}</div>}
        {page < Math.ceil(count / 10) && (
          <>
            <div
              className="pagination__next"
              onClick={() => router.push(`/?page=${page + 1}`)}
            >
              {page + 1}
            </div>
            <img
              src="images/Vector-right.svg"
              alt="right"
              onClick={() => router.push(`/?page=${page + 1}`)}
              className="pagination__right"
            />
          </>
        )}
      </div>
    </section>
  );
}
