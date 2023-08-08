import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import ScrollToTop from "ScrollToTop";
const Root = () => {
  return (
    <>
      <ScrollToTop />
      <section className="parent relative h-screen">
        <header className="nav-header fixed w-full top-0 z-[1000] bg-palette-3 shadow-md flex flex-col items-center justify-center">
          <Navigation />
        </header>
        <main className="outlet h-full">
          <Outlet />
        </main>
      </section>
    </>
  );
};

export default Root;
