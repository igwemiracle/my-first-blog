import { Link, useLocation } from 'react-router-dom';
import icon from '../assets/icons/nav-icon.png';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="navbar">
            <Link to="/">
                <img src={icon} alt="icon-notShowing" className="nav-icon" />
            </Link>
            <h1>Miracle Blog</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/blogs">Blogs</Link>
                <Link to="/auth/login">Login</Link>
                {location.pathname === "/account" && <Link to="/account">Account</Link>}
                {/* <Link to="/create">Add blog</Link> */}
            </div>
        </nav>
    );
}

export default Navbar;