import React, { useState } from "react";
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
import { useCategories } from "../hooks/useApi";
import Cart from "./Cart";
export default function Header() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { logout: authLogout, user } = useAuth();
  const { data: categories } = useCategories({ enabled: true });

  const handleLogout = () => {
    authLogout();
    navigate("/login");
  };

  return (
    <header className='header container'>
      <Cart visible={visible} onVisibleChange={(e) => setVisible(e)} />
      <div className='header__container'>
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
              count={0}
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
