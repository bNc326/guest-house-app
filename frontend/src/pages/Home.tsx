import Contact from "components/HomeComponents/Contact/Contact";
import ForFishermen from "components/HomeComponents/ForFishermen/ForFishermen";
import Hero from "../components/HomeComponents/Hero/Hero";
import Welcome from "../components/HomeComponents/Welcome/Welcome";
import Footer from "components/HomeComponents/Footer";
const Home = () => {
  return (
    <>
      <Hero />
      <Welcome />
      <ForFishermen />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
