import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <header className="bg-gray-800 p-4 text-white">
            <nav className="flex space-x-4">
                <NavLink to="/" className={({ isActive }) => isActive ? "text-yellow-500 font-bold" : "text-white" }>Home</NavLink>
                <NavLink to="/about" className={({ isActive }) => isActive ? "text-yellow-500 font-bold" : "text-white" } > About </NavLink>
                <NavLink to="/team" className={({ isActive }) => isActive ? "text-yellow-500 font-bold" : "text-white" } > Team </NavLink>
            </nav>
        </header>
    );
}

export default Header;