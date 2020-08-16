import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__categories">
        <h2 className="footer__heading">Categories</h2>
        <ul>
          <li>
            <Link href="/[category]" as="/news">
              <a>&gt; News</a>
            </Link>
          </li>
          <li>
            <Link href="/[category]" as="/entertainment">
              <a>&gt; Entertainment</a>
            </Link>
          </li>
          <li>
            <Link href="/[category]" as="/review">
              <a>&gt; Reviews</a>
            </Link>
          </li>
          <li>
            <Link href="/[category]" as="/technology">
              <a>&gt; Technology</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="footer__pages">
        <h2 className="footer__heading">Pages</h2>
        <ul>
          <li>
            <Link href="/">
              <a>&gt; Home</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>&gt; About</a>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <a>&gt; Contact us</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="footer__copyright">
        Made with &#128151; by{" "}
        <a href="https://www.instagram.com/mrical_singhal/" target="_blank">
          MriCode
        </a>{" "}
      </div>
    </footer>
  );
}
