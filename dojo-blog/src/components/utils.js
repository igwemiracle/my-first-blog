export const handleDelete = (blogId, navigate) => {
    const confirmed = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmed) return;

    fetch(`http://localhost:8000/auth/delete/${blogId}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
    }).then(() => {
        navigate('/');
    });
};
