import { useState, useEffect } from "react";
import { fetchAllBlogs } from "../../API/blogs";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Link, useNavigate } from "react-router-dom";

export default function AllBlog() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBlog() {
      try {
        const storedBlogs = await fetchAllBlogs();
        console.log(storedBlogs);
        setBlogs(storedBlogs);
      } catch (error) {
        setError(`Error: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBlog();
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          <h1 className="header">blog</h1>
          <button>
            <Link to={`/blogform`}>Add Blog Post</Link>
          </button>
          {blogs.map((blog) => (
            <div key={blog.blog_id} className="posts">
              <Card style={{ background: "#FBFBED", color: "#1E221F" }}>
                <h2>{blog.blog_title}</h2>
                <CardMedia>
                  <img src={blog.blog_image} alt={blog.blog_title} />
                </CardMedia>
                <CardContent>
                  <h3>{blog.blog_post}</h3>
                </CardContent>
                <button>
                  <Link to={`/blogs/${blog.blog_id}/edit`}>Edit Blog Post</Link>
                </button>
              </Card>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
