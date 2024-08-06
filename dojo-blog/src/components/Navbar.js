import { Link } from 'react-router-dom';
import icon from '../assets/icons/nav-icon.png';
const Navbar = () => {
    return (

        <nav className="navbar">
            <img src={icon} alt="icon-notShowing" className="nav-icon" />
            <h1 style={{ paddingLeft: "5px" }}>Miracle Blog</h1>
            <div className="links">
                <Link to="/">Home</Link>
                {/* <Link to="/story">Our story</Link> */}
                <Link to="/blogs">Blogs</Link>
                <Link to="/signup">Sign up</Link>
                {/* <Link to="/signin">Sign in</Link> */}
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