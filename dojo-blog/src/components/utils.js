export const handleDelete = (blogId, navigate) => {
    fetch('http://localhost:8000/auth/blogs' + blogId, {
        method: "DELETE"
    }).then(() => {
        navigate('/');
    });
};
