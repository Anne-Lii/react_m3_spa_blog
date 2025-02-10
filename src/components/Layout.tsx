
import { Outlet } from 'react-router-dom';
import Header from "../components/Header"
import Footer from "../components/Footer"

const Layout= () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* Child routes renderas här */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
