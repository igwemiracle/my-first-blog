import { useState } from "react";

// How to implement controlled inputs: This is just a way of setting up input fields 
// and forms in react so that we can track their values. And when users type into these input
// fields we can in turn store that value of what they typed in a state and can also make it so
// that if the state changes that in turn updates the value that we see in the input fields.
const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Patience Jacob');
    const [isPending, setIsPending] = useState(false); //This is set to false because when we first
    // Load the page we are not making the request straight away.

    const handleSubmit = (e) => {
        // e.preventDefault();
        const blog = { title, body, author };
        setIsPending(true);

        fetch('http://localhost:8000/blogs', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)

        }).then(() => {
            console.log("New Blog Added!")
            setIsPending(false) // This is set to false since it has been completed.
        })
    }

    return (
        <div className="create">
            <h1>Add a New Blog</h1>
            <div className="form-style" style={{
                marginTop: "40px"
            }}>
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
                    <label>Blog author:</label>
                    <select
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}>
                        <option value="Patience Jacob">Patience Jacob</option>
                        <option value="scott McClean">scott McClean</option>
                    </select>
                    {!isPending && <button>Add Blog</button>}
                    {isPending && <button disabled>Adding blog...</button>}
                </form>
            </div>
        </div>
    );
}

export default Create;