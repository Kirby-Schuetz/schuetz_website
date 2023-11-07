import { useState } from "react";
import { TextField } from "@mui/material";
import { createProject } from "../../API/projects";
import { Card } from "@mui/material";
import { useNavigate, Navigate } from "react-router-dom";

export default function CreateProjectForm() {
  const [projects, setProjects] = useState([]);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectImage, setProjectImage] = useState("");
  const [projectPost, setProjectPost] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const postData = {
    project_image: projectImage,
    project_title: projectTitle,
    project_post: projectPost,
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const APIData = await createProject(postData);
    console.log(APIData);
    navigate("/projects");
  }
  return (
    <div>
      <div className="form">
        <h1 className="header">Post a Project</h1>
        <Card>
          <form onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            <TextField
              id="NP-input-box"
              value={projectTitle}
              label="Title"
              fullWidth
              margin="normal"
              multiline
              onChange={(e) => setProjectTitle(e.target.value)}
            />
            <TextField
              id="NP-input-box"
              value={projectPost}
              label="Post"
              fullWidth
              margin="normal"
              multiline
              onChange={(e) => setProjectPost(e.target.value)}
            />
            <TextField
              id="NP-input-box"
              value={projectImage}
              label="Image"
              fullWidth
              margin="normal"
              multiline
              onChange={(e) => setProjectImage(e.target.value)}
            />
            <button type="submit" id="np-button">
              Post Project
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
}
