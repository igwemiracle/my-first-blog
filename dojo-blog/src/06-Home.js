import { Link } from "react-router-dom";

const HomePage = () => {

    return (
        <div className="home">
            <header>
                <div class="header-container">
                    <div class="header-container-inner">
                        <h1>Explore, Learn, Inspire: Your Blogging Journey Starts Here.</h1>
                        <p style={{ marginTop: "25px" }}>Welcome to Miracle Blog, your go-to destination for insightful blog posts. Our misson is to provide a platform where ideas flow freely, and knowledge is shared generously.</p>
                        <Link to="/blogs" class="btn">Learn more</Link>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default HomePage;