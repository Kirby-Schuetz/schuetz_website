import { useState } from "react";
import { TextField } from "@mui/material";
import { createBlog } from "../../API/blogs";
import { Card } from "@mui/material";
import { useNavigate, Navigate } from "react-router-dom";

export default function CreateBlogForm() {
  const [blogs, setBlogs] = useState([]);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogPost, setBlogPost] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const postData = {
    blog_title: blogTitle,
    blog_image: blogImage,
    blog_post: blogPost,
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const APIData = await createBlog(postData);
    console.log(APIData);
    navigate("/blogs");
  }
  return (
    <div>
      <div className="form">
        <h1 className="header">Post a Blog</h1>
        <Card>
          <form onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            <TextField
              id="NP-input-box"
              value={blogTitle}
              label="Title"
              fullWidth
              margin="normal"
              multiline
              onChange={(e) => setBlogTitle(e.target.value)}
            />
            <TextField
              id="NP-input-box"
              value={blogPost}
              label="Post"
              fullWidth
              margin="normal"
              multiline
              onChange={(e) => setBlogPost(e.target.value)}
            />
            <TextField
              id="NP-input-box"
              value={blogImage}
              label="Image"
              fullWidth
              margin="normal"
              multiline
              onChange={(e) => setBlogImage(e.target.value)}
            />
            <button type="submit" id="np-button">
              Post Blog
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
}
