import { useEffect, useState } from "react";
import { editBlog, fetchBlogByBlogId, deleteBlog } from "../../API/blogs";
import { useParams, useNavigate } from "react-router-dom";

export default function EditBlog() {
  const { blog_id } = useParams();
  const [isDeleted, setIsDeleted] = useState(false);
  const [postToEdit, setPostToEdit] = useState({
    blog_image: "",
    blog_title: "",
    blog_post: "",
  });
  const navigate = useNavigate()


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
        })
      } catch (error) {
        console.error("Trouble getting post. Try again!", error);
      }
    }
    getBlogByBlogId();
  }, [blog_id]);

  async function handleSubmit(e) {
    e.preventDefault();

  try {
    const response = await editBlog(
      postToEdit.blog_id,
      postToEdit
    );
    console.log("Edited", response);
    alert("Post successfully edited!");
    const returnVal = response;
    return returnVal;
  } catch(error) {
    console.log(error);
  }
};

const handleDelete = async (blog_id) => {
  try {
    const response = await deleteBlog(blog_id);
    setIsDeleted(true);
  } catch (error) {
    console.error("Trouble deleting post. Try again!", error);
  }
};

return (
  <>
  <h2>Edit Blog Post</h2>
  <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Image:</label>
      <textarea
        type="text"
        value={postToEdit.blog_image}
        onChange={(e) => setPostToEdit({
          ...postToEdit,
          blog_image: e.target.value,
        })
      }
      />
      </div>
      <div>
        <label>Title:</label>
       <textarea
        type="text"
        value={postToEdit.blog_title}
        onChange={(e) => setPostToEdit({
          ...postToEdit,
          blog_title: e.target.value,
        })
      }
      />
      </div>
      <div>
        <label>Post:</label>
       <textarea
        type="text"
        value={postToEdit.blog_post}
        onChange={(e) => setPostToEdit({
          ...postToEdit,
          blog_post: e.target.value,
        })
      }
      />
      </div>
      <button type="submit">Submit</button>

      {/* <input
        type="button"
        value="Submit Changes"
      onClick={() => {
        handleSubmit;
        navigate('/blogs');
      }}
      /> */}
      <input 
      type="button"
      value="Delete"
      onClick={() => {
        const shouldDelete = window.confirm(
          "Are you sure you want to delete this post?"
        );
        if (shouldDelete) {
          handleDelete(blog_id);
          navigate('/blogs');
        }
      }}
      />
    </form>
  </div>
  </>
);
}