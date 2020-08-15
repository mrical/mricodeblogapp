import React, { useState, useEffect } from "react";
import Axios from "axios";
import Link from "next/link";

function Navbar() {
  const [Open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  function toggleClass() {
    setOpen(!Open);
  }
  useEffect(() => {
    if (window.innerWidth > 500) {
      setOpen(false);
    }
    window.onresize = () => {
      if (window.innerWidth > 500) {
        setOpen(false);
      }
    };
    const fetchData = async () => {
      const { data } = await Axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`
      );
      const categories = data.map((category) => category.category);
      setCategories(categories);
    };
    fetchData();
  }, []);

  return (
    <nav className={`nav ${Open && "open"}`}>
      <ul className="nav__items">
        {categories.map((category) => (
          <li className="nav__item" key={category}>
            <Link href="/[category]" as={`/${category}`}>
              <a className="btn-primary btn-primary--white">{category}</a>
            </Link>
          </li>
        ))}
        <div className={`menu-btn ${Open && "open"}`} onClick={toggleClass}>
          <div className="menu-btn__line"></div>
          <div className="menu-btn__line"></div>
          <div className="menu-btn__line"></div>
          <div className="menu-btn__line"></div>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
