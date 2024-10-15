import React from 'react'
import logo from '../../logo.svg';

function NotAuthHeader() {
  return (
    <header className="row justify-content-center align-items-center text-center g-0 m-0">
      <figure className="col-3 m-0">
        <img src={logo} className="img-fluid slogo" alt="logo" />
      </figure>
      <h1 className="col-10 ">
        <span>Baby</span>Tracker
      </h1>
    </header>
  );
}

export default NotAuthHeader;
