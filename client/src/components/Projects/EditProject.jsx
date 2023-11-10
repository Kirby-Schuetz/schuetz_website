import { useEffect, useState } from "react";
import { Card, TextField } from "@mui/material";
import {
  editProject,
  fetchProjectByProjectId,
  deleteProject,
} from "../../API/projects";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProject() {
  const { project_id } = useParams();
  const [isDeleted, setIsDeleted] = useState(false);
  const [postToEdit, setPostToEdit] = useState({
    project_image: "",
    project_title: "",
    project_post: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
        });
      } catch (error) {
        console.error("Trouble getting post. Try again!", error);
      }
    }
    getProjectByProjectId();
  }, [project_id]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await editProject(postToEdit.project_id, postToEdit);
      console.log("Edited", response);
      alert("Post successfully edited!");
      navigate("/projects");
      const returnVal = response;
      return returnVal;
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (project_id) => {
    try {
      const response = await deleteProject(project_id);
      console.log("Deleted", response);
      setIsDeleted(true);
    } catch (error) {
      console.error("Trouble deleting post. Try again!", error);
    }
  };

  return (
    <div>
      <div className="form">
        <h1 className="header">edit a project</h1>
        <Card style={{ background: "#FBFBED", color: "#1E221F" }}>
          <form onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            <TextField
              id="NP-input-box"
              label="Image"
              fullWidth
              margin="normal"
              multiline
              value={postToEdit.project_image}
              onChange={(e) =>
                setPostToEdit({
                  ...postToEdit,
                  project_image: e.target.value,
                })
              }
            />
            {/* <label>Title:</label> */}
            <TextField
              id="NP-input-box"
              value={postToEdit.project_title}
              label="Title"
              fullWidth
              margin="normal"
              multiline
              onChange={(e) =>
                setPostToEdit({
                  ...postToEdit,
                  project_title: e.target.value,
                })
              }
            />

            {/* <label>Post:</label> */}
            <TextField
              id="NP-input-box"
              label="Post"
              fullWidth
              margin="normal"
              multiline
              value={postToEdit.project_post}
              onChange={(e) =>
                setPostToEdit({
                  ...postToEdit,
                  project_post: e.target.value,
                })
              }
            />
            <button type="submit">Submit</button>
            <></> <></> <></>
            <button
              className="button"
              onClick={() => {
                const shouldDelete = window.confirm(
                  "Are you sure you want to delete this post?"
                );
                if (shouldDelete) {
                  handleDelete(project_id);
                  navigate("/projects");
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
