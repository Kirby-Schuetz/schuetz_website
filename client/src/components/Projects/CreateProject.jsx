import { useState } from "react";
import { Card, TextField } from "@mui/material";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createProject } from "../../API/projects";
import { useNavigate } from "react-router-dom";

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
    try{
      const APIData = await createProject(postData);
      console.log(APIData);
      navigate("/projects");
    } catch (error) {
      console.error("Error in handleSubmit:", error.message);
    }
   
  }
  return (
    <div>
      <div className="form">
        <h1 className="header">post a project</h1>
        <Card style={{ background: "#FBFBED", color: "#1E221F" }}>
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
