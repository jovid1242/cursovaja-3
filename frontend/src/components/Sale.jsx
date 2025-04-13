import React from "react";
import { Button } from "antd";
import "../styles/components/Sale.scss";
export default function Sale() {
  return (
    <div className='Sale container'>
      <div className='Sale__container'>
        <div className='Sale__container__left'>
          <h2>New Dining Chair Set</h2>
          <p>Up To 30% Off</p>
          <Button>Shop Now</Button>
        </div>
        <div className='Sale__container__right'>
          <img src='https://htmldemo.net/urdan/urdan/assets/images/bg/bg-1.png' />
        </div>
      </div>
    </div>
  );
}
