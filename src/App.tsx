import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ImageryProvider from '@/components/providers/ImageryProvider';

const Home = lazy(() => import('@/pages/Home'));
const Solutions = lazy(() => import('@/pages/Solutions'));
const Products = lazy(() => import('@/pages/Products'));
const Customers = lazy(() => import('@/pages/Customers'));
const Internship = lazy(() => import('@/pages/Internship'));
const Contact = lazy(() => import('@/pages/Contact'));
const ImageryPanel = lazy(() => import('@/components/tweaks/ImageryPanel'));

export default function App() {
  return (
    <ImageryProvider>
      <Suspense fallback={null}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="solutions" element={<Solutions />} />
            <Route path="products" element={<Products />} />
            <Route path="customers" element={<Customers />} />
            <Route path="internship" element={<Internship />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </Suspense>
      <Suspense fallback={null}>
        <ImageryPanel />
      </Suspense>
    </ImageryProvider>
  );
}
