import React, { useState, useEffect } from "react";
import { Button, Badge } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  LoginOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../styles/Header.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCategories, useCart } from "../hooks/useApi";
import Cart from "./Cart";

export default function Header() {
  const [visible, setVisible] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const navigate = useNavigate();
  const { logout: authLogout, user } = useAuth();
  const { data: categories } = useCategories({ enabled: true });
  const { data: cartItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    authLogout();
    navigate("/login");
  };

  const cartCount =
    cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <header className={`header ${isFixed ? "fixed" : ""}`}>
      <Cart visible={visible} onVisibleChange={(e) => setVisible(e)} />
      <div className='header__container container'>
        <Link to='/' className='header__logo'>
          Mii
        </Link>

        <nav className='header__nav'>
          {categories?.map((category) => (
            <Link
              key={category.id}
              to={`/products?categoryId=${category.id}`}
              className='header__nav-link'
            >
              {category.name}
            </Link>
          ))}
        </nav>

        <div className='header__actions'>
          <Button
            type='text'
            icon={<SearchOutlined />}
            onClick={() => navigate("/products")}
          />
          {user && (
            <Button
              type='text'
              icon={<UserOutlined />}
              onClick={() => navigate("/profile")}
            />
          )}
          {user && (
            <Badge
              count={cartCount}
              className='cart-badge'
              onClick={() => setVisible(true)}
            >
              <Button type='text' icon={<ShoppingCartOutlined />} />
            </Badge>
          )}
          {user?.role === "admin" && (
            <Button
              type='text'
              icon={<DashboardOutlined />}
              onClick={() => navigate("/admin")}
            />
          )}
          {user ? (
            <Button
              type='text'
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            />
          ) : (
            <Button
              type='text'
              icon={<LoginOutlined />}
              onClick={() => navigate("/login")}
            />
          )}
        </div>
      </div>
    </header>
  );
}
