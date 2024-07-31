import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom";

const BlogDetails = () => {
    const { id } = useParams();
    const { data: blog, error, isPending } = useFetch('http://localhost:8000/blogs/' + id);
    const history = useHistory();
    const handleDelete = () => {
        fetch('http://localhost:8000/blogs/' + blog.id, {
            method: "DELETE"
        }).then(() => {
            history.push('/');
        });
    }

    return (
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article style={{ lineHeight: "20px" }}>
                    <h2> {blog.title} </h2>
                    <div>{blog.body}</div>
                    <p style={{
                        paddingLeft: "70%"
                    }}>Written by {blog.author}</p>
                    <button onClick={handleDelete}>Delete blog</button>
                </article>

            )}
        </div>
    );
}

export default BlogDetails;