import { Link } from "react-router-dom";

const HomePage = () => {

    return (
        <div className="home">
            <header>
                <div className="header-container">
                    <div className="header-container-inner">
                        <h1>Explore, Learn, Inspire: Your Blogging Journey Starts Here.</h1>
                        <p style={{ marginTop: "25px" }}>Welcome to Miracle Blog, your go-to destination for insightful blog posts. Our misson is to provide a platform where ideas flow freely, and knowledge is shared generously.</p>
                        <Link to="/auth/blogs" className="btn">Start reading</Link>
                    </div>
                </div>
            </header>
            <div className="horizontal-line">
                <Link to="/" className="horizontal-line-link">Help</Link>
                <Link to="/story" className="horizontal-line-link">Our story</Link>
                <Link to="/" className="horizontal-line-link">Terms</Link>
                <Link to="/" className="horizontal-line-link">Privacy</Link>
            </div>
        </div>



    );
}

export default HomePage;