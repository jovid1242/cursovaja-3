import React from "react";
import { Button, Badge } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../styles/Header.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { logout: authLogout, user } = useAuth();

  const handleLogout = () => {
    authLogout();
    navigate("/login");
  };

  return (
    <header className='header container'>
      <div className='header__container'>
        <Link to='/' className='header__logo'>
          urdan.
        </Link>

        <nav className='header__nav'>
          <Link to='/' className='header__nav-link'>
            Home
          </Link>
          <Link to='/shop' className='header__nav-link'>
            Shop
          </Link>
          <Link to='/pages' className='header__nav-link'>
            Pages
          </Link>
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
            <Badge count={0} className='cart-badge'>
              <Button type='text' icon={<ShoppingCartOutlined />} />
            </Badge>
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
