import React from 'react';
import { BrowserRouter as Router, useLocation, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './06-Home';
import Blogs from './components/Blogs';
// import Create from './components/Create';
import Comments from './components/Comment';
import BlogDetails from './components/BlogDetails';
import NotFound from './components/NotFound';
import OurStory from './components/OurStory';
import backgroundImage from './assets/images/back-img3.jpg';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import AccountPage from './components/Account';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import CreateBlog from './components/CreateBlog';
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
        height: '100vh',
        filter: "brightness(0.75)",
    };

    return (
        <div style={isHomePage ? homePageStyle : {}} className="app">
            <Navbar />
            <div className="content">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/auth/blogs" element={<Blogs />} />
                    {/* <Route path="/auth/create_blog" element={<Create />} /> */}
                    <Route path="/auth/create_blog" element={<CreateBlog />} />
                    <Route path="/account" element={<AccountPage />} />
                    <Route path="/auth/login" element={<SignIn />} />
                    <Route path="/auth/register" element={<SignUp />} />
                    <Route path="/story" element={<OurStory />} />
                    <Route path="/auth/forgot_password" element={<ForgotPassword />} />
                    <Route path="/auth/reset_password" element={<ResetPassword />} />
                    <Route path="/auth/blogs/:id" element={<BlogDetails />} />
                    <Route path="/comment" element={<Comments />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
