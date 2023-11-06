import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { editBlog, fetchBlogByBlogId } from "../../API/blogs";
import { useNavigate } from "react-router-dom";

export default function EditBlog({blog_id}) {
  const [isLoading, setIsLoading] = useState(true);
  const [userBlogs, setUserBlogs] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [blogToEdit, setBlogToEdit] = useState({
    blog_title: "",
    blog_post: "",
    blog_image: "",
  });
  
  // const { userId } = useLogin();
  // const navigate = useNavigate();

  // function handleEditFormClose() {
  //   setIsFormOpen(false);
  // }

  function handleEditFormOpen(blog) {
    setBlogToEdit({
      blog_title: blog.blog_title,
      blog_post: blog.blog_post,
      blog_image: blog.blog_image,
    });
    setIsFormOpen(true);
  }

  useEffect(() => {
    async function getUserBlogs() {
      if (typeof blog_id === "undefined") {
        console.log("blog_id not defined");
        return;
      }
      try {
        const response = await fetchBlogByBlogId(blog_id);
        setUserBlogs(response);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    getUserBlogs();
  }, [blog_id]);

  async function handleEditFormSubmit() {
    try {
      const result = await editBlog(blogToEdit.blog_id, blogToEdit);
      console.log("Update post", result);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  }


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
