import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { editBlog, getBlogByBlogId } from "../../API/blogs";
import { useNavigate } from "react-router-dom";

export default function EditBlog() {
  const [isLoading, setIsLoading] = useState(true);
  const [userBlogs, setUserBlogs] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [blogToEdit, setBlogToEdit] = useState({
    blog_title: "",
    blog_post: "",
    blog_image: "",
  });
  const { userId } = useLogin();
  const navigate = useNavigate();

  function handleEditFormClose() {
    setIsFormOpen(false);
  }

  function handleEditFormOpen(blog) {
    setBlogToEdit({
      blog_id: blog.blog_id,
      blog_title: blog.blog_title,
      blog_post: blog.blog_post,
      blog_image: blog.blog_image,
    });
    setIsFormOpen(true);
  }

  async function handleEditFormSubmit() {
    try {
      const result = await editBlog(blogToEdit.blog_id, blogToEdit);
      console.log("Update post", result);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function fetchUserBlogs() {
      try {
        const response = await getBlogByBlogId(userId);
        setUserBlogs(response.posts);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    fetchUserBlogs();
  }, []);

  return (
    <div>
      {userBlogs.map((blog) => (
        <div key={blog.blog_id}>
          <button onClick={() => handleEditFormOpen(blog)}>Edit Post</button>
          {isFormOpen && (
            <>
              <div>
                <h1>Edit Post</h1>
                <TextField
                  id="NP-input-box"
                  value={blogToEdit.blog_image}
                  label="Image"
                  multiline
                  margin="normal"
                  fullWidth
                  onChange={(e) =>
                    setBlogToEdit({
                      ...blogToEdit,
                      blog_image: e.target.value,
                    })
                  }
                />
                <TextField
                  id="NP-input-box"
                  value={blogToEdit.blog_title}
                  label="Title"
                  multiline
                  margin="normal"
                  fullWidth
                  onChange={(e) =>
                    setBlogToEdit({
                      ...blogToEdit,
                      blog_title: e.target.value,
                    })
                  }
                />
                <TextField
                  id="NP-input-box"
                  value={blogToEdit.blog_post}
                  label="Blog Post"
                  multiline
                  margin="normal"
                  fullWidth
                  onChange={(e) =>
                    setBlogToEdit({
                      ...blogToEdit,
                      blog_post: e.target.value,
                    })
                  }
                />
                <button onClick={handleEditFormSubmit}>Submit Changes</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
