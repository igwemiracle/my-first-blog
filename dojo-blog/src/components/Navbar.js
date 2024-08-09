import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import icon from '../assets/icons/nav-icon.png';
const Navbar = () => {
    const location = useLocation();

    return (

        <nav className="navbar">
            <Link to="/">
                <img src={icon} alt="icon-notShowing" className="nav-icon" />
            </Link>
            <h1 style={{ paddingLeft: "5px" }}>Miracle Blog</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/blogs">Blogs</Link>
                <Link to="/account">Account</Link>
                {/* Conditionally render the Sign Up link if not on the Sign Up or Sign In page */}
                {location.pathname !== "/auth/register" && <Link to="/auth/register">Sign Up</Link>}
                {/* Conditionally render the Sign In link if not on the Sign In or Sign Up page */}
                {/* {location.pathname !== "/signin" && <Link to="/signin">Login</Link>} */}
                <Link to="/create" style={{
                    color: "white",
                    backgroundColor: "#f1356d",
                    borderRadius: "8px",
                }}>Add blog</Link>


            </div>
        </nav>
    );
}

export default Navbar;