import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Miracle Blog</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/story">Our story</Link>
                <Link to="/blogs">Blogs</Link>
                <Link to="/create" style={{
                    color: "white",
                    backgroundColor: "#f1356d",
                    borderRadius: "8px",
                }}>Add Blog</Link>


            </div>
        </nav>
    );
}

export default Navbar;