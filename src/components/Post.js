import React from "react";
import Link from "next/link";

export default function Post({ thumbnail, title, description, id }) {
  return (
    <div className="post">
      <div
        className="post__image"
        style={{
          backgroundImage: `url(${thumbnail.url})`,
        }}
      ></div>
      <div className="post__text">
        <Link href="/blog/[id]" as={`/blog/${id}`}>
          <a>
            <h2 className="heading-lg">{title}</h2>
          </a>
        </Link>
        <p className="paragraph-lg">{description}</p>
        <div className="post__buttons">
          <a
            href="https://www.instagram.com/mrical_singhal/"
            target="_blank"
            className="creator"
          >
            By Mrical
          </a>
          <Link href="/blog/[id]" as={`/blog/${id}`}>
            <a className="btn-secondary btn-secondary--purple">Read More</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
