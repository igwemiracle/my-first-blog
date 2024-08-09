import { useState } from "react";
import { useHistory } from "react-router-dom";

const SignIn = () => {
    const [username, setUserName] = useState('');
    // const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState("");
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);

        try {
            const response = await fetch("http://localhost:8000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    username: username,
                    // email: email,
                    password: password,
                }),
            });

            if (response.redirected) {
                history.push(response.url);
            } else {
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
            <h1>Login User</h1>
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
                    {/* <label>Email:</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /> */}
                    <label>Password:</label>
                    <input
                        name="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {!isPending && <button type="submit">Sign in</button>}
                    {isPending && <button disabled>Signing up...</button>}
                </form>
            </div>
        </div>
    );
};

export default SignIn;
