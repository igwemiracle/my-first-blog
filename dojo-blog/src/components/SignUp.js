import { useState } from "react";
import { useHistory } from "react-router-dom";

const SignUp = () => {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState("");
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);

        try {
            const response = await fetch("http://localhost:8000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                    confirm_password: confirmPassword,
                }),
            });

            if (response.status === 201) {
                // Handle success - for example, redirect to the account page
                const data = await response.json();
                history.push(data.redirect_url);  // Redirect to the account page
            } else {
                // Handle errors
                const data = await response.json();
                setError(data.error_message || "Registration failed.");
            }
        } catch (err) {
            setError("An unexpected error occurred.");
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
