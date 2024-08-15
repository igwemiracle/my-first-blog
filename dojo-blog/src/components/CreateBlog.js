import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);

        const accessToken = localStorage.getItem('access_token');
        // Get the access token from localStorage
        const response = await fetch('http://localhost:8000/auth/create_blog', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
                // Include the access token in the Authorization header
            },
            body: JSON.stringify({
                title: title,
                body: body,
            })
        });
        if (response.status === 200 || response.status === 201) {
            // Handle success - for example, redirect to the account page
            const result = await response.json();
            console.log("response =====>", result)
            navigate('/auth/blogs')
        } else {
            console.error("Failed to create blog");
        }
    }
    return (
        <div className="create">
            <h1>Add a New Blog</h1>
            <div className="form-style" style={{ marginTop: "40px" }}>
                {/* the form tag handles the submit event */}
                <form onSubmit={handleSubmit}>
                    <label>Blog title:</label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label>Blog body:</label>
                    <textarea
                        required
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    ></textarea>

                    {!isPending && <button>Add Blog</button>}
                    {isPending && <button disabled>Adding blog...</button>}
                </form>
            </div>
        </div>
    );
}

export default CreateBlog;