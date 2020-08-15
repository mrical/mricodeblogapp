import React, { useState } from "react";
import MainWrapper from "../components/MainWrapper";
import Axios from "axios";

export default function contact() {
  const [form, setForm] = useState({ email: "", fullName: "", message: "" });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ret = await Axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/contact-forms`,
        form
      );
    } catch (error) {
      console.log(error);
    }
    alert("Done");
    setForm({ message: "", fullName: "", email: "" });
  };
  return (
    <MainWrapper>
      <div className="contactUs">
        <div className="contactUs__head">
          <h1 className="contactUs__heading">Connect with us on</h1>
          <a href="#">@mricoder</a>
        </div>
        <div className="contactUs__form">
          <h1 className="contactUs__heading">Contact form</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email"
              required
              value={form.email}
              onChange={handleChange}
            />
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Eg. John Doe"
              required
              value={form.fullName}
              onChange={handleChange}
            />
            <label htmlFor="message">message</label>
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="10"
              placeholder="Enter Your Query"
              required
              value={form.message}
              onChange={handleChange}
            />
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </MainWrapper>
  );
}
