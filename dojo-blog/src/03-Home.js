import { useState } from "react";
import BlogList from "./BlogList";

// Building a mini-simple blog
const ThirdHome = () => {
    const [blogs, setBlogs] = useState([
        { "title": "React Tutorial", "id": 1, "Author": "Miracle", "Body": "Lorem pesume..." },
        { "title": "State Management", "id": 2, "Author": "Miracle", "Body": "Lorem pesume..." },
        { "title": "Web dev tools tip", "id": 3, "Author": "Sixtus", "Body": "Lorem pesume..." },
    ])
    return (
        <div className="home-03">
            <BlogList blogs={blogs} title="All Blogs!" />
            {/* The BlogList now has the ability to be reused anywhere in our program */}
            <BlogList blogs={blogs.filter((blog) => (blog.Author === "Miracle"))} title="Miracle's Blog" />
        </div>
    );
}

export default ThirdHome;