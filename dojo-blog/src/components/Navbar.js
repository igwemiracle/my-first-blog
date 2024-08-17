import { Link, useNavigate } from 'react-router-dom';
import icon from '../assets/icons/nav-icon.png';

const Navbar = () => {
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8000/auth/logout', {
                method: 'GET',
                credentials: 'include',  // Include cookies in the request
            });

            if (response.status === 200) {
                localStorage.removeItem('username');  // Clear the username from localStorage
                localStorage.removeItem('access_token')
                navigate('/');  // Redirect to the home page
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
                {!username ? (
                    <>
                        {/* When not logged in show Home and Blogs */}
                        <Link to="/">Home</Link>
                        <Link to="/auth/blogs">Blogs</Link>

                    </>
                ) : (<></>)}

                {username ? (
                    <>
                        {/* When logged in, always show Account and Logout */}
                        <Link to="/">Home</Link>
                        <Link to="/auth/blogs">Blogs</Link>
                        <Link to="/account">Account</Link>
                        <Link to="/" onClick={handleLogout}>Logout</Link>
                    </>
                ) : (
                    <>
                        {/* When not logged in, show Login */}
                        <Link to="/auth/login">Login</Link>
                        <Link to="/auth/create_blog" className='add-blog'>Add blog</Link>
                    </>
                )}

            </div>
        </nav>
    );
}

export default Navbar;
