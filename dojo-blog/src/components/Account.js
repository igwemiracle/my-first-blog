import { Link } from "react-router-dom/";

const AccountPage = () => {
    // const location = useLocation();
    // const queryParams = new URLSearchParams(location.search);
    // const username = queryParams.get('username');
    // WITH THE USE OF THE COMMENTED CODE ABOVE, WHEN THE USER SUCCESSFULLY LOGS IN OR REGISTERS
    // THE USERNAME IS RETRIEVED FROM THE QUERY PARAMETER IN THE URL ("location.search") 
    const username = localStorage.getItem('username');

    return (
        <div className="account">
            <h1 className="account-h1">Welcome, {username}! This is your account page.</h1>
            <p className="account-p">You can create and upload your own blog!</p>
            <p className="account-p">click to start creating your blog</p>
            <Link to="/auth/create_blog" className="account-link">Add blog</Link>
        </div>
    );
}

export default AccountPage;
