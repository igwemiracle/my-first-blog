// ======== Making a Custom Hook: To fetch data =======
// This is simply making the logic of our code reuseable to avoid code repition,
// Thereby externalizing each logic of our code into it's javascript file for reuseable purpose.
import BlogList from "./BlogList";
import useFetch from "./useFetch";

const SixthHome = () => {

    const { data: blogs, isPending, error } = useFetch('http://localhost:8000/blogs')
    return (
        <div className="home-03">
            {error && <div>{error}</div>}
            {/*A conditional statement that logs the message in the div only if IsPending is true*/}
            {isPending && <div>Is Loading...</div>}
            {/* we render the BlogList once we have data, which is "blogs" */}
            {blogs && <BlogList blogs={blogs} title="All Blogs!" />}
            {/* This 👉 |<BlogList blogs={blogs} title="All Blogs!"| only works when
            `blogs` works  */}

        </div>
    );
}
export default SixthHome;