import React from 'react';
import Navbar from './components/Navbar';
import HomePage from './06-Home';
import Blogs from './components/Blogs';
import Create from './components/Create';
import Comments from './components/Comment';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
// import BlogDetails from './components/BlogDetails';
import NotFound from './components/NotFound';
import backgroundImage from './assets/back-img.jpg';
/**
 *    FIRST STEP to making use of the Router component:
 * We need to surround our whole application using the `Router` Component. And
 * That means we can use the Router in our entire application, all components that
 * are nested inside the App Component have access to the Router
 *    SECOND STEP:
 * The second step is to decide where we want our page content to go when we go to
 * different pages. We can do this using the `Switch` Component provided we have a 
 * specific location we want our page content to be.
 */

function App() {
    return (
        <Router>
            <Main />
        </Router>
    );
}

const Main = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    const homePageStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        color: 'white',
        padding: '20px',
    };

    return (
        <div style={isHomePage ? homePageStyle : {}} className="app">
            <Navbar />
            <div className="content">
                <div className="overlay"></div>

                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/blogs" exact component={Blogs} />
                    <Route path="/create" component={Create} />
                    {/* <Route path="/blogs/:id" component={BlogDetails} /> */}
                    <Route path="/comment" component={Comments} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </div>
        </div>
    );
}

export default App;
