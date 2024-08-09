import { useLocation } from "react-router-dom";

const AccountPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const username = queryParams.get('username');

    return (
        <div className="account">
            <h1>Welcome, {username}! This is your account page.</h1>
        </div>
    );
}

export default AccountPage;
