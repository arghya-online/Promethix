import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";
import { ScrollToTop } from "../components/ScrollToTop.jsx";

function AppLayout() {


  return (
    <div className="min-h-screen flex flex-col font-body">
      <ScrollToTop />
      <Header />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
