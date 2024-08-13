import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const ResetPassword = () => {
    const [error, setError] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [NewPassword, setNewPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [resetPasswordToken, setResetPasswordToken] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchToken = async () => {
            const query = new URLSearchParams(location.search);
            const token = query.get('reset_password_token');

            if (token) {
                try {
                    const response = await fetch(`http://localhost:8000/auth/reset_password?reset_password_token=${token}`);
                    const data = await response.json();
                    if (response.ok) {
                        setResetPasswordToken(data.reset_password_token);
                    } else {
                        setError(data.error_message || "Failed to fetch token");
                    }
                } catch (error) {
                    setError("Network error");
                }
            }
        };

        fetchToken();
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
                    new_password: NewPassword,
                    confirm_password: ConfirmPassword,
                    reset_password_token: resetPasswordToken,
                }),
            });
            const contentType = response.headers.get("content-type");
            let data;
            if (response.ok) {
                if (contentType && contentType.includes("application/json")) {
                    data = await response.json();
                    navigate(data.redirect_url);
                } else {
                    throw new Error("Response is not JSON");
                }
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error_message || "An unknown error occurred");
            }
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
                        name="new_password"
                        type="password"
                        required
                        value={NewPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <div style={{ paddingTop: "30px" }}>
                        <label>Confirm password:</label>
                        <input
                            name="confirm_password"
                            type="password"
                            required
                            value={ConfirmPassword}
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
