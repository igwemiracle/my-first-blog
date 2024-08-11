import { Link, useLocation, useNavigate } from 'react-router-dom';
import icon from '../assets/icons/nav-icon.png';

const Navbar = () => {
    const location = useLocation();
    const username = localStorage.getItem('username');
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8000/auth/logout', {
                method: 'GET',
                credentials: 'include',  // Include cookies in the request
            });

            if (response.status === 200) {
                localStorage.removeItem('username');  // Clear the username from localStorage
                navigate('/');  // Redirect to the login page
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <nav className="navbar">
            <Link to="/">
                <img src={icon} alt="icon-notShowing" className="nav-icon" />
            </Link>
            <h1>Miracle Blog</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/blogs">Blogs</Link>

                {username ? (
                    <>
                        {/* When logged in, show Account and Logout */}
                        {location.pathname === "/account" && <Link to="/account">Account</Link>}
                        <Link to="/auth/login" onClick={handleLogout}>Logout</Link>
                    </>
                ) : (
                    <>
                        {/* When not logged in, show Login or Logout depending on the current path */}
                        {location.pathname !== "/auth/login" ? (
                            <Link to="/auth/login">Login</Link>
                        ) : (
                            <Link to="/auth/login" onClick={handleLogout}>Logout</Link>
                        )}
                    </>
                )}
            </div>

        </nav>
    );
}

export default Navbar;