// How to make a component take in props-data and use that data inside that component.
// In other words, we can also make it to be reuseable.
import { Link, useHistory } from "react-router-dom";
import icon from '../assets/icons/comment-icon.png';
import anotherIcon from '../assets/icons/delete-icon2.png';
import { handleDelete } from './utils'; // Import the handleDelete function

const BlogList = ({ blogs, title }) => {
    const history = useHistory();

    const truncate = (str, num) => {
        if (str.length <= num) {
            return str;
        }
        return str.slice(0, num) + "...";
    };

    return (
        <div className="blog-list" style={{ marginBottom: "50px" }}>
            <h1>{title}</h1>
            {blogs.map((blog) => (
                <div className="blog_preview" key={blog.id}>
                    <div>
                        <h3>{blog.title}</h3>
                        <p>{truncate(blog.body, 70)}</p>
                        <Link to={`/blogs/${blog.id}`} className="read-more-link">
                            Read More
                        </Link>
                        <div className="container">
                            <p className="text">Published on {blog.date}</p>
                        </div>
                        <Link to={'/comment'} className="icon-link">
                            <img src={icon} alt="icon-notShowing" className="icon" />
                        </Link>
                        <Link to={'/'} className="icon-link">
                            <img src={anotherIcon} alt="icon-notShowing" className="icon" onClick={() => handleDelete(blog.id, history)} />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BlogList;
