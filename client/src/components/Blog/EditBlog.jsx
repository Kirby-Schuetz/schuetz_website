import { useEffect, useState } from "react";
import { editBlog, fetchBlogByBlogId, deleteBlog } from "../../API/blogs";
import { useParams, useNavigate } from "react-router-dom";
import { Card, TextField } from "@mui/material";

export default function EditBlog() {
  const { blog_id } = useParams();
  const [isDeleted, setIsDeleted] = useState(false);
  const [postToEdit, setPostToEdit] = useState({
    blog_image: "",
    blog_title: "",
    blog_post: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getBlogByBlogId() {
      try {
        const response = await fetchBlogByBlogId(blog_id);
        const selectedBlog = response;
        setPostToEdit({
          blog_id: selectedBlog.blog_id,
          blog_title: selectedBlog.blog_title,
          blog_image: selectedBlog.blog_image,
          blog_post: selectedBlog.blog_post,
        });
      } catch (error) {
        console.error("Trouble getting post. Try again!", error);
      }
    }
    getBlogByBlogId();
  }, [blog_id]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await editBlog(postToEdit.blog_id, postToEdit);
      console.log("Edited", response);
      alert("Post successfully edited!");
      navigate("/blogs");
      const returnVal = response;
      return returnVal;
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (blog_id) => {
    try {
      const response = await deleteBlog(blog_id);
      console.log("Deleted", response);
      setIsDeleted(true);
    } catch (error) {
      console.error("Trouble deleting post. Try again!", error);
    }
  };

  return (
    <div>
      <div className="form">
        <h1 className="header">edit a blog</h1>
        <Card style={{ background: "#FBFBED", color: "#1E221F" }}>
          <form onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            <TextField
              id="NP-input-box"
              label="Image"
              fullWidth
              margin="normal"
              multiline
              value={postToEdit.blog_image}
              onChange={(e) =>
                setPostToEdit({
                  ...postToEdit,
                  blog_image: e.target.value,
                })
              }
            />
            <TextField
              id="NP-input-box"
              label="Title"
              fullWidth
              margin="normal"
              multiline
              value={postToEdit.blog_title}
              onChange={(e) =>
                setPostToEdit({
                  ...postToEdit,
                  blog_title: e.target.value,
                })
              }
            />
            <TextField
              id="NP-input-box"
              label="Post"
              fullWidth
              margin="normal"
              multiline
              value={postToEdit.blog_post}
              onChange={(e) =>
                setPostToEdit({
                  ...postToEdit,
                  blog_post: e.target.value,
                })
              }
            />
            <button type="submit">Submit</button>
            <button
              className="button"
              onClick={(e) => {
                e.preventDefault();
                const shouldDelete = window.confirm(
                  "Are you sure you want to delete this post?"
                );
                if (shouldDelete) {
                  handleDelete(blog_id);
                  navigate("/blogs");
                }
              }}
            >
              Delete
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
}
