import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="Navbar">
            <ul>
                <li><Link style={{ color: "white" }} to="/">Home</Link></li>
                <li><Link style={{ color: "white" }} to="/about">About</Link></li>
                <li><Link style={{ color: "white" }} to="/editor">Editor</Link></li>
            </ul>
        </div>
    )
}

export default Navbar;
