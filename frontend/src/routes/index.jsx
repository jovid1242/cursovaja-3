import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import HomePage from "../pages/user/HomePage";
import ProductsPage from "../pages/user/ProductsPage";
import CartPage from "../pages/user/CartPage";
import AdminHomePage from "../pages/admin/HomePage";
import AdminProductsPage from "../pages/admin/ProductPage";
import ProductPage from "../pages/user/ProductPage";
import ProfilePage from "../pages/user/ProfilePage";

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to='/login' />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to='/' />;
  }

  return children;
};

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      {/* Protected User Routes */}
      <Route path='/products' element={<ProductsPage />} />
      <Route path='/product/:id' element={<ProductPage />} />
      <Route
        path='/profile'
        element={
          <ProtectedRoute roles={["user", "admin"]}>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path='/cart'
        element={
          <ProtectedRoute roles={["user", "admin"]}>
            <CartPage />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path='/admin'
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminHomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path='/admin/products'
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminProductsPage />
          </ProtectedRoute>
        }
      />

      {/* Fallback route */}
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
}
