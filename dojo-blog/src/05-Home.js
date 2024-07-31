import { useState, useEffect } from "react";
import BlogList from "./BlogList";

const FifthHome = () => {
    const [blogs, setBlogs] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    // This simply means only ever fire the function once on the initial render
    //  and not whenever the data changes.
    useEffect(() => {
        // This is just to Simulate what it would feel like when your page has to load before the
        //   data is displayed. This should not be practiced or used in a real time program.
        setTimeout(() => {
            fetch('http://localhost:8000/blogs')
                .then(res => {
                    if (!res.ok) {
                        throw Error('could not fetch data for that resource');
                    }
                    return res.json();
                })
                .then((data) => {
                    setBlogs(data)
                    setIsPending(false)
                    setError(null)
                })
                .catch((err) => {
                    setError(err.message)
                    setIsPending(false)
                })
        }, (2000))

    }, [])
    return (
        <div className="home-03">
            {error && <div>{error}</div>}
            {/*A conditional statement that logs the message in the div only if IsPending is true*/}
            {isPending && <div>Is Loading...</div>}
            {/* we render the BlogList once we have data, which is "blogs" */}
            {blogs && <BlogList blogs={blogs} title="All Blogs" />}
            {/* This 👉 |<BlogList blogs={blogs} title="All Blogs!"| only works when
            `blogs` has data in it. */}
        </div>
    );
}
export default FifthHome;