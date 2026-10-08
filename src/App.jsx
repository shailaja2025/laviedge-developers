import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Components/layout/Navbar';
import Footer from './Components/layout/Footer';
import EnquiryModal from './Components/layout/EnquiryModal';
import FloatingActions from './Components/layout/FloatingActions';
import CustomCursor from './Components/layout/CustomCursor';
import PageLoader from './Components/layout/PageLoader';
import PageTransition from './Components/layout/PageTransition';
import RouteProgress from './Components/layout/RouteProgress';
import SmoothScroll from './Components/layout/SmoothScroll';
import ScrollHud from './Components/fx/ScrollHud';
import PageSweep from './Components/fx/PageSweep';
import Home from './pages/Home';
import { useLanguage } from './context/LanguageContext';
import { FLAGSHIP_SLUG, HASH_ROUTES, paths, projectPath } from './data/routes';

const AboutPage = lazy(() => import('./pages/AboutPage'));
const FounderPage = lazy(() => import('./pages/FounderPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const NRIPage = lazy(() => import('./pages/NRIPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ProjectPage = lazy(() => import('./pages/ProjectPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));

function PageFallback() {
  return <div className="min-h-[50vh] bg-forest-950" aria-hidden="true" />;
}

function HashRedirect() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    const dest = hash ? HASH_ROUTES[hash] : null;

    if (dest && location.pathname !== dest.path) {
      navigate(dest.section ? `${dest.path}#${dest.section}` : dest.path, { replace: true });
      return undefined;
    }

    const scrollId = dest?.section || hash;
    if (scrollId) {
      let cancelled = false;
      const scrollToId = (id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const lenis = window.__laviedgeLenis;
        if (lenis) lenis.scrollTo(el, { immediate: true, offset: -72 });
        else el.scrollIntoView({ behavior: 'auto', block: 'start' });
        return true;
      };
      const tryScroll = (attempts = 0) => {
        if (cancelled) return;
        if (scrollToId(scrollId)) {
          window.setTimeout(() => {
            if (!cancelled) scrollToId(scrollId);
          }, 280);
          window.setTimeout(() => {
            if (!cancelled) scrollToId(scrollId);
          }, 700);
          return;
        }
        if (attempts < 30) window.setTimeout(() => tryScroll(attempts + 1), 80);
        else window.scrollTo({ top: 0, behavior: 'auto' });
      };
      tryScroll();
      return () => {
        cancelled = true;
      };
    }

    window.__laviedgeLenis?.scrollTo(0, { immediate: true });
    window.scrollTo({ top: 0, behavior: 'auto' });
    return undefined;
  }, [location.pathname, location.hash, navigate]);

  return null;
}

export default function App() {
  const location = useLocation();
  const { t } = useLanguage();
  const isLogin = location.pathname === paths.login;

  return (
    <>
      <a href="#main" className="skip-link">
        {t('skip')}
      </a>
      <div className="grain" aria-hidden="true" />
      <PageLoader />
      <RouteProgress />
      <PageSweep />
      <ScrollHud />
      <CustomCursor />
      <SmoothScroll />
      <HashRedirect />
      {isLogin ? null : <Navbar />}
      <main id="main">
        <PageTransition>
          <Suspense fallback={<PageFallback />}>
            <Routes location={location}>
              <Route path={paths.home} element={<Home />} />
              <Route path={paths.about} element={<AboutPage />} />
              <Route path={paths.founder} element={<FounderPage />} />
              <Route path={paths.projects} element={<ProjectsPage />} />
              <Route path={paths.nri} element={<NRIPage />} />
              <Route path={paths.gallery} element={<GalleryPage />} />
              <Route path={paths.contact} element={<ContactPage />} />
              <Route path={paths.login} element={<LoginPage />} />
              <Route path={projectPath(FLAGSHIP_SLUG)} element={<Navigate to={paths.nri} replace />} />
              <Route path="/projects/:slug" element={<ProjectPage />} />
              <Route path={paths.notFound} element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to={paths.notFound} replace />} />
            </Routes>
          </Suspense>
        </PageTransition>
      </main>
      {isLogin ? null : <Footer />}
      {isLogin ? null : <FloatingActions />}
      <EnquiryModal />
    </>
  );
}
