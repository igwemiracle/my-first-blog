export const handleDelete = (blogId, history) => {
    fetch('http://localhost:8000/blogs/' + blogId, {
        method: "DELETE"
    }).then(() => {
        history.push('/blogs');
    });
};
