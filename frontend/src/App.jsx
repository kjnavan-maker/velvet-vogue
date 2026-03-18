import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import AdminRoute from "./components/routing/AdminRoute";
import ScrollProgressBar from "./components/common/ScrollProgressBar";
import SmoothScroll from "./components/common/SmoothScroll";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ContactPage from "./pages/ContactPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import ProfilePage from "./pages/ProfilePage";
import MyOrdersPage from "./pages/MyOrdersPage";
import NotFoundPage from "./pages/NotFoundPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import ManageProductsPage from "./pages/admin/ManageProductsPage";
import AddProductPage from "./pages/admin/AddProductPage";
import EditProductPage from "./pages/admin/EditProductPage";
import ManageOrdersPage from "./pages/admin/ManageOrdersPage";
import ManageInquiriesPage from "./pages/admin/ManageInquiriesPage";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

function App() {
  const location = useLocation();

  return (
    <>
      <SmoothScroll />
      <ScrollProgressBar />
      <ScrollToTop />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="shop" element={<ShopPage />} />
            <Route path="product/:id" element={<ProductDetailsPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route
              path="checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route
              path="order-confirmation/:id"
              element={
                <ProtectedRoute>
                  <OrderConfirmationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="my-orders"
              element={
                <ProtectedRoute>
                  <MyOrdersPage />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="/admin/login" element={<AdminLoginPage />} />

          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboardPage />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <ManageProductsPage />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/products/add"
            element={
              <AdminRoute>
                <AddProductPage />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/products/:id/edit"
            element={
              <AdminRoute>
                <EditProductPage />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <ManageOrdersPage />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/inquiries"
            element={
              <AdminRoute>
                <ManageInquiriesPage />
              </AdminRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;