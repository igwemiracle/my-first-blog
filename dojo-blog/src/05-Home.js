import { useState, useEffect } from "react";
import BlogList from "./BlogList";

const FifthHome = () => {
    const [blogs, setBlogs] = useState(null)
    const [isPending, setIsPending] = useState(true)
    // This simply means only ever fire the function once on the initial render
    //  and not whenever the data changes.
    useEffect(() => {
        // This is just to Simulate what it would feel like when your page has to load before the
        //   data is displayed. This should not be practiced or used in a real time program.
        setTimeout(() => {
            fetch('http://localhost:8000/blogs')
                .then(res => {
                    return res.json();
                })
                .then((data) => {
                    // console.log(data);
                    setBlogs(data)
                    setIsPending(false)
                })
        }, (100000))

    }, [])
    return (
        <div className="home-03">
            {/* we render the BlogList once we have data, which is "blogs" */}
            {isPending && <div>Is Loading...</div>}
            {blogs && <BlogList blogs={blogs} title="All Blogs!" />}
            {/* This 👉 |<BlogList blogs={blogs} title="All Blogs!"| only works when
            `blogs` works  */}

        </div>
    );
}
export default FifthHome;