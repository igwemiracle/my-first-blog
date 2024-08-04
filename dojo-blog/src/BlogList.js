// How to make a component take in props-data and use that data inside that component.
// In other words, we can also make it to be reuseable.
import { Link } from "react-router-dom";
import icon from './comment-icon.png';
const BlogList = ({ blogs, title }) => {

    const truncate = (str, num) => {
        if (str.length <= num) {
            return str;
        }
        return str.slice(0, num) + "...";
    };

    return (
        <div className="blog-list" style={{ marginBottom: "50px" }}>
            <h1>{title}</h1>
            {
                blogs.map((blog) => (
                    <div className="blog_preview" key={blog.id}>
                        <div>
                            <h3> {blog.title}</h3>
                            <p>{truncate(blog.body, 70)}</p>
                            <Link to={`/blogs/${blog.id}`} className="read-more-link">Read More</Link>
                            <div className="container">
                                <p className="text">Published on {blog.date}</p>
                                <Link to={'/comment'}>
                                    <img src={icon} alt="icon-notShowing" className="icon" />
                                </Link>
                            </div>
                        </div>
                    </div>
                )
                )
            }
        </div >
    );
}

export default BlogList;