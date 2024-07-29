// How to make a component take in props-data and use that data inside that component.
// In other words, we can also make it to be reuseable.
import { Link } from "react-router-dom";

const BlogList = ({ blogs, title }) => {
    //     The three props can be passed as parameters in curly braces to the BlogList function
    // const blogs = props.blogs;
    // const title = props.title;
    // const handleDelete = props.handleDelete;

    return (
        <div className="blog-list" style={{
            marginBottom: "50px"
        }}>
            <h1>{title}</h1>
            {
                blogs.map((blog) => (
                    <div className="blog_preview" key={blog.id}
                        style={{
                            paddingTop: "35px", paddingLeft: "25px", marginTop: "15px",
                            backgroundColor: "#f2f2f2", borderRadius: "8px", paddingBottom: "15px",
                        }}>
                        <Link to={`/blogs/${blog.id}`} style={{
                            textDecoration: "none",

                        }}>
                            <h3 style={{ color: "#f1356d" }}> {blog.title}</h3>
                            <p style={{ paddingTop: "10px", paddingLeft: "10px" }}>Written By {blog.Author}</p>
                        </Link>
                    </div>
                )
                )
            }
        </div >
    );
}

export default BlogList;