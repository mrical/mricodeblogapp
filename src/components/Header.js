import React from "react";
import Link from "next/link";
function Header() {
  return (
    <header className="header">
      <img
        src="https://res.cloudinary.com/dkis5gxl8/image/upload/v1597546336/MriCode-logo-big_zhh4h2.svg"
        alt="logo"
        className="header__logo"
      />
      <nav className="header__nav">
        <ul className="header__items">
          <li className="header__item">
            <Link href="/">
              <a className="header__link">Home</a>
            </Link>
          </li>
          <li className="header__item">
            <Link href="/about">
              <a className="header__link">About</a>
            </Link>
          </li>
          <li className="header__item">
            <Link href="/contact">
              <a className="header__link">Contact US</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
