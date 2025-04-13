import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/Footer.scss";

export default function Footer() {
  return (
    <div className='Footer'>
      <div className='container'>
        <div className='Footer-wrapper'>
          <div className='Footer__container__left'>
            <h3>Logo</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos.
            </p>
          </div>
          <div className='Footer__container__right'>
            <h3>Categories</h3>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/'>Home</Link>
              </li>
            </ul>
          </div>
          <div className='Footer__container__right'>
            <h3>Pages</h3>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/'>Home</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
