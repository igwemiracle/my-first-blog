import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const ResetPassword = () => {
    const [error, setError] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [resetPasswordToken, setResetPasswordToken] = useState('');
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        // Extract the reset_password_token from query parameters
        const query = new URLSearchParams(location.search);
        setResetPasswordToken(query.get('reset_password_token'));
    }, [location.search]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);
        setError('');

        try {
            const response = await fetch('http://localhost:8000/auth/reset_password', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    new_password: password,
                    confirm_password: confirmPassword,
                    reset_password_token: resetPasswordToken,
                }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error_message || "An unknown error occurred");
            }
            const contentType = response.headers.get("content-type");
            let data;
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
                // Redirect or navigate to a success page
                navigate("/auth/login");
            } else {
                throw new Error("Response is not JSON");
            }
            return data;
        } catch (err) {
            setError(err.message);
        } finally {
            setIsPending(false);
        }
    }

    return (
        <div className="sign-up">
            <h1 style={{ marginBottom: "10px" }}>Reset Password</h1>
            <p>We've sent you an email with instructions to reset your password.</p>
            <div style={{ marginTop: "40px" }}>
                <form onSubmit={handleSubmit}>
                    <label>New password:</label>
                    <input
                        name="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div style={{ paddingTop: "30px" }}>
                        <label>Confirm password:</label>
                        <input
                            name="confirmPassword"
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {!isPending && <input className="forgot-pass-submit" type="submit" value="Reset Password" />}
                    {isPending && <input disabled className="forgot-pass-submit" type="submit" value="Processing..." />}
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
