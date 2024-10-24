import React from "react";
import { NavLink } from "react-router-dom";
import './headerStyles.css';

function Header() {
  return (
    <header className="fixed w-full h-24 z-10 p-4 bg-opacity-30 backdrop-blur-md border border-transparent transition-all duration-300 flex flex-row">
      <nav className="space-x-4">
        <NavLink to="/" className={({ isActive }) => isActive ? "text-yellow-500 font-bold font-albulaRegular" : "text-white font-albulaRegular tracking-widest"}> HOME </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "text-yellow-500 font-bold font-albulaRegular" : "text-white font-albulaMedium"}> ABOUT </NavLink>
        <NavLink to="/team" className={({ isActive }) => isActive ? "text-yellow-500 font-bold font-albulaRegular" : "text-white font-albulaBold"}> TEAM </NavLink>
      </nav>
    </header>
  );
}

export default Header;