import React from "react";
import "./Header.scss";
import logo from "../../assets/images/logo.png";

export default function Header() {
  return (
    <header className="header">
      <img src={logo} alt="" />
    </header>
  );
}
