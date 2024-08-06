import { Link } from "react-router-dom";

const HomePage = () => {

    return (
        <div className="home">
            <header>
                <div class="header-container">
                    <div class="header-container-inner">
                        <h1>Explore, Learn, Inspire: Your Blogging Journey Starts Here.</h1>
                        <p style={{ marginTop: "25px" }}>Welcome to Miracle Blog, your go-to destination for insightful blog posts. Our misson is to provide a platform where ideas flow freely, and knowledge is shared generously.</p>
                        <Link to="/blogs" class="btn">Start reading</Link>
                    </div>
                </div>
            </header>
            <div class="horizontal-line">
                <Link to="/" className="home-link">Help</Link>
                <Link to="/story" className="home-link">Our story</Link>
                <Link to="/" className="home-link">Terms</Link>
                <Link to="/" className="home-link">Privacy</Link>
            </div>
        </div>



    );
}

export default HomePage;