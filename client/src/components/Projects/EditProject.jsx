import { useEffect, useState } from "react";
import { editProject, fetchProjectByProjectId, deleteProject } from "../../API/projects";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProject() {
  const { project_id } = useParams();
  const [isDeleted, setIsDeleted] = useState(false);
  const [postToEdit, setPostToEdit] = useState({
    project_image: "",
    project_title: "",
    project_post: "",
  });
  const navigate = useNavigate()


  useEffect(() => {
    async function getProjectByProjectId() {
      try {
        const response = await fetchProjectByProjectId(project_id);
        const selectedProject = response;
        setPostToEdit({
          project_id: selectedProject.project_id,
          project_title: selectedProject.project_title,
          project_image: selectedProject.project_image,
          project_post: selectedProject.project_post,
        })
      } catch (error) {
        console.error("Trouble getting post. Try again!", error);
      }
    }
    getProjectByProjectId();
  }, [project_id]);

  async function handleSubmit(e) {
    e.preventDefault();

  try {
    const response = await editProject(
      postToEdit.project_id,
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

const handleDelete = async (project_id) => {
  try {
    const response = await deleteProject(project_id);
    setIsDeleted(true);
  } catch (error) {
    console.error("Trouble deleting post. Try again!", error);
  }
};

return (
  <>
  <h2>Edit Project Post</h2>
  <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Image:</label>
      <textarea
        type="text"
        value={postToEdit.project_image}
        onChange={(e) => setPostToEdit({
          ...postToEdit,
          project_image: e.target.value,
        })
      }
      />
      </div>
      <div>
        <label>Title:</label>
       <textarea
        type="text"
        value={postToEdit.project_title}
        onChange={(e) => setPostToEdit({
          ...postToEdit,
          project_title: e.target.value,
        })
      }
      />
      </div>
      <div>
        <label>Post:</label>
       <textarea
        type="text"
        value={postToEdit.project_post}
        onChange={(e) => setPostToEdit({
          ...postToEdit,
          project_post: e.target.value,
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
          handleDelete(project_id);
          navigate('/projects');
        }
      }}
      />
    </form>
  </div>
  </>
);
} 