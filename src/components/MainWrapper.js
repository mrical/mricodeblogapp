import React, { useEffect, useState } from "react";
import SidePosts from "./SidePosts";
import Axios from "axios";

export default function MainWrapper({ children }) {
  const [open, setOpen] = useState(true);
  const [email, setEmail] = useState("");
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Axios.post(`${process.env.NEXT_PUBLIC_API_URL}/emails`, { email });
    } catch (error) {
      console.log(error);
    }
    alert("Done");
    setEmail("");
  };
  useEffect(() => {
    if (window.innerWidth > 700) {
      setOpen(true);
    } else {
      setOpen(false);
    }
    window.onresize = () => {
      if (window.innerWidth > 700) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };
  }, []);
  return (
    <main className="main">
      <div className="sidebar">
        <section className="follow">
          <div className="follow__text">
            <h2 className="heading-secondary">Follow us on</h2>
          </div>
          <div className="follow__icons">
            <a href="https://www.instagram.com/mrical_singhal/" target="_blank">
              <img
                src="https://res.cloudinary.com/dkis5gxl8/image/upload/v1597546336/twitter-icon_amozb3.svg"
                alt="twitter-icon"
                className="icon"
              />
            </a>
            <a href="https://www.instagram.com/mrical_singhal/" target="_blank">
              <img
                src="https://res.cloudinary.com/dkis5gxl8/image/upload/v1597546336/facebook-icon_cm2o7b.svg"
                alt="facebook-icon"
                className="icon"
              />
            </a>
            <a href="https://www.instagram.com/mrical_singhal/" target="_blank">
              <img
                src="https://res.cloudinary.com/dkis5gxl8/image/upload/v1597546337/youtube-icon_nguvei.svg"
                alt="youtube-icon"
                className="icon"
              />
            </a>
          </div>
        </section>
        <section className="notification">
          <div className="notification__text">
            <h2 className="heading-secondary">Get Notified</h2>
          </div>
          <form className="notification__form" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={handleChange}
            />
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </section>
        {open && (
          <>
            <SidePosts type="entertainment" />
            <SidePosts type="news" />
          </>
        )}
      </div>
      {children}
      {!open && (
        <div className="bottomPosts">
          <SidePosts type="entertainment" />
          <SidePosts type="news" />
        </div>
      )}
    </main>
  );
}
