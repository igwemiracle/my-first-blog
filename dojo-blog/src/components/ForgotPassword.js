import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ForgotPassword = () => {
    const [error, setError] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:8000/auth/forgot_password', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData)
                throw new Error(errorData.error_message || "An unknown error occurred");
            }
            const contentType = response.headers.get("content-type");
            let data;
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
                // Navigate to the reset password page or show a message
                // If the backend provides a token in the response, you might use it here
                navigate('/auth/reset_password');
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
        <div className="forgot-pass">
            <div className="forgot-pass-main">
                <h2 className="forgot-pass-h2">Forgot Password</h2>
                <p className="forgot-pass-p">Please enter your email to verify it's you.</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="userEmail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}"
                    />
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {!isPending && <input className="forgot-pass-submit" type="submit" value="Verify Your Email" />}
                    {isPending && <input disabled className="forgot-pass-submit" type="submit" value="Verifying..." />}
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
