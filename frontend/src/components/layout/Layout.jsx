import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="min-h-screen bg-velvet-cream">
      <Navbar />
      <main className="pt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;