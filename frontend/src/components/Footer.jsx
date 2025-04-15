import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/Footer.scss";

export default function Footer() {
  return (
    <div className='Footer'>
      <div className='container'>
        <div className='Footer-wrapper'>
          <div className='Footer__container__left'>
            <h3>Mii</h3>
            <p>
              Разработанный для вас, Mii - это онлайн-магазин, который поможет
              вам найти и купить все, что вам нужно.
              <br />
              Copyright 2025 Jovid Ma. Все права защищены.
            </p>
          </div>
          <div className='Footer__container__right'>
            <h3>Категории</h3>
            <ul>
              <li>
                <Link to='/products?categoryId=1'>Холодильники</Link>
              </li>
              <li>
                <Link to='/products?categoryId=2'>Стиральные машины</Link>
              </li>
              <li>
                <Link to='/products?categoryId=3'>Телевизоры</Link>
              </li>
              <li>
                <Link to='/products?categoryId=4'>Стиральные машины</Link>
              </li>
            </ul>
          </div>
          <div className='Footer__container__right'>
            <h3>Страницы</h3>
            <ul>
              <li>
                <Link to='/'>Главная</Link>
              </li>
              <li>
                <Link to='/'>О нас</Link>
              </li>
              <li>
                <Link to='/'>Контакты</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
