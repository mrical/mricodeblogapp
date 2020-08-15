import React from "react";
import Link from "next/link";
function Header() {
  return (
    <header className="header">
      <img
        src="/images/MriCode-logo-big.svg"
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
