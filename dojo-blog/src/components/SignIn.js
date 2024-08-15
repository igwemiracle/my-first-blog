import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom/";

const SignIn = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);

        try {
            const response = await fetch("http://localhost:8000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            if (response.status === 200 || response.status === 201) {
                // Handle success - for example, redirect to the account page
                const data = await response.json();
                // Store the username in localStorage
                localStorage.setItem('username', username);
                localStorage.setItem('access_token', data.access_token);
                // console.log('Redirecting to:', data.redirect_url);
                navigate(encodeURI(data.redirect_url));  // Redirect to the account page
            } else {
                // Handle errors
                const data = await response.json();
                console.log("Signin data =======> ", data)
                setError(data.error_message || "Login failed.");
            }
        } catch (err) {
            setError("An unexpected error occurred.");
        } finally {
            setIsPending(false);
        }
    };


    return (
        <div className="sign-up">
            <h1>Login New User</h1>
            <div style={{ marginTop: "40px" }}>
                <form onSubmit={handleSubmit}>
                    <label>Username:</label>
                    <input
                        name="username"
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <label>Password:</label>
                    <input
                        name="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {!isPending && <button type="submit">Login</button>}
                    {isPending && <button disabled>Logging in...</button>}

                </form>
            </div>
            <div className="signin-link-container">
                <Link to="/auth/forgot_password" className="signin-link">forgot password?</Link>
                <Link to="/auth/register" className="signin-link">don't have an account? sign up</Link>
                {/* <Link to="/auth/register" className="signin-link">sign up</Link> */}
            </div>
        </div>
    );
};

export default SignIn;
