import React from "react";
import { Button } from "antd";
import "../styles/components/Sale.scss";
import { useNavigate } from "react-router-dom";
export default function Sale() {
  const navigate = useNavigate();
  return (
    <div className='Sale container'>
      <div className='Sale__container'>
        <div className='Sale__container__left'>
          <h2>Новая коллекция</h2>
          <p>До 30% скидки</p>
          <Button onClick={() => navigate("/products")}>Посмотреть</Button>
        </div>
        <div className='Sale__container__right'>
          <img src='https://htmldemo.net/urdan/urdan/assets/images/bg/bg-1.png' />
        </div>
      </div>
    </div>
  );
}
