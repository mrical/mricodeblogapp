import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "../../styles/ckeditor.css";
import "../../styles/sass/main.scss";

function MyApp({ Component, pageProps }) {
  return (
    <div className="container">
      <Header />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
