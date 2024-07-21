import { useState } from "react";

// Building a mini-simple blog
const SecondHome = () => {
    const [blogs, setBlogs] = useState([
        { "Title": "React Tutorial", "id": 1, "Author": "Miracle", "Body": "Lorem pesume..." },
        { "Title": "State Management", "id": 2, "Author": "Jacob", "Body": "Lorem pesume..." },
        { "Title": "Web dev tools tip", "id": 3, "Author": "Sixtus", "Body": "Lorem pesume..." },
    ])
    return (
        <div className="home-02">
            {
                blogs.map((blog) => (
                    <div className="blog_preview" key={blog.id}>
                        <h2> {blog.Title}</h2>
                        <p>Written By {blog.Author}</p>
                    </div>
                ))}
        </div>
    );
}

export default SecondHome;