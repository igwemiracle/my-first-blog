import { useState } from "react";
import BlogList from "./BlogList";

// Building a mini-simple blog
const FourthHome = () => {
    const [blogs, setBlogs] = useState([
        { "title": "React Tutorial", "id": 1, "Author": "Miracle", "Body": "Lorem pesume..." },
        { "title": "State Management", "id": 2, "Author": "Miracle", "Body": "Lorem pesume..." },
        { "title": "Web dev tools tip", "id": 3, "Author": "Sixtus", "Body": "Lorem pesume..." },
    ])

    const handleDelete = (id) => {
        // Note: The `filter` method doesn't change the array, it only returns
        //       a new filtered array based on the original array given.
        const newBlogs = blogs.filter(blog => blog.id !== id);
        // We want to return TRUE if the id doesn't match because we want to keep it in the array
        // And return FASLE when it does match the id so that it can be filtered out. 
        setBlogs(newBlogs);
    }

    return (
        <div className="home-03">

            {/* The BlogList now has the ability to be reused anywhere in our program */}

            {/* <BlogList blogs={blogs.filter((blog) => (blog.Author === "Miracle"))}
                title="Miracle's Blog"
                handleDelete={handleDelete} /> */}
            {/*Passing a function as a prop */}
            <BlogList blogs={blogs} title="All Blogs!" handleDelete={handleDelete} />
        </div>
    );
}

export default FourthHome;