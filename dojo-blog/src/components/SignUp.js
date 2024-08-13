import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);
        setError(null);

        try {
            const response = await fetch("http://localhost:8000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username, email: email, password: password,
                    confirm_password: confirmPassword,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error_message || "An unknown error occurred")
            }

            // Check if the response is JSON before parsing
            const contentType = response.headers.get("content-type");
            let data;
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
                // Store the username in localStorage
                localStorage.setItem("username", username);
                //redirect or navigate to the account page
                navigate(data.redirect_url);
            } else {
                throw new Error("Response is not JSON");
            }
            // Handle the data returned from the backend
            return data;

        } catch (err) {
            setError(err.message);
        } finally {
            setIsPending(false);
        }

    };

    return (
        <div className="sign-up">
            <h1>Register New User</h1>
            <div className="edit-sign" style={{ marginTop: "40px" }}>
                <form onSubmit={handleSubmit}>
                    <label>Username:</label>
                    <input
                        name="username"
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <label>Email:</label>
                    <input
                        name="email"
                        type="email"
                        required
                        value={email}
                        pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Password:</label>
                    <input
                        name="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label>Confirm Password:</label>
                    <input
                        name="confirmPassword"
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {!isPending && <button type="submit">Sign Up</button>}
                    {isPending && <button disabled>Signing up...</button>}
                </form>
            </div>
        </div>
    );
};

export default SignUp;