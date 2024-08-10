import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const AccountPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const username = queryParams.get('username');

    return (
        <div className="account">
            <h1 className="account-h1">Welcome, {username}! This is your account page.</h1>
            <p className="account-p">You can create and upload your own blog!</p>
            <Link to="/create" className="account-link">Add blog</Link>
        </div>
    );
}

export default AccountPage;
