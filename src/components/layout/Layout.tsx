import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  const { pathname, hash } = useLocation();

  // Smooth-scroll to hash; reset to top on plain navigation
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      return;
    }
    const el = document.getElementById(hash.slice(1));
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [pathname, hash]);

  const isLanding = pathname === '/';

  return (
    <>
      <Navbar />
      <main className={`content${isLanding ? ' landing' : ''}`}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
