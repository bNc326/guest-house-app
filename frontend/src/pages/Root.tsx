import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
const Root = () => {
  return (
    <>
      <section className="parent relative min-h-screen">
        <header className="nav-header sticky w-full top-0 z-[1000] bg-palette-3 shadow-md flex flex-col items-center justify-center">
          <Navigation />
        </header>
        <main className="outlet">
          <Outlet />
        </main>
      </section>
    </>
  );
};

export default Root;
