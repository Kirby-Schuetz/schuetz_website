import { useState } from "react";
import { Card, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { createProject } from "../../API/projects";
import { useNavigate } from "react-router-dom";

export default function CreateProjectForm() {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectImage, setProjectImage] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [codeLink, setCodeLink] = useState("");
  const [demoLink, setDemoLink] = useState("")
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const generateFormattedPost = () => {
    return `
  ${projectDescription}

  ---

  **Links:**
  ${codeLink ? `[View Code Repository](${codeLink})` : ""}
  ${demoLink ? `[View Live Demo/Video](${demoLink})` : ""} 
    `.trim();
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const postData= {
      project_image: projectImage,
      project_title: projectTitle,
      project_post: generateFormattedPost(),
    };

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
        <Card style={{ background: "#f1efdf", color: "#333", padding: "16px" }}>
          <form onSubmit={handleSubmit}>
            {error && <p style={{ color: "#9d2f3c"}}>{error}</p>}
            
            <TextField
              id="project-title"
              value={projectTitle}
              label="Project Title"
              fullWidth
              margin="normal"
              multiline
              onChange={(e) => setProjectTitle(e.target.value)}
            />
            
            <TextField
              id="project-description"
              value={projectDescription}
              label="Project Description"
              fullWidth
              margin="normal"
              multiline
              rows={5}
              onChange={(e) => setProjectDescription(e.target.value)}
            />

            <TextField
              id="project-image"
              value={projectImage}
              label="Image"
              fullWidth
              margin="normal"
              onChange={(e) => setProjectImage(e.target.value)}
              placeholder="https://postimages.org/"
            />
              <TextField
              id="code-link"
              value={codeLink}
              label="Code Repository Link"
              fullWidth
              margin="normal"
              onChange={(e) => setCodeLink(e.target.value)}
              placeholder="https://github.com/Kirby-Schuetz?tab=repositories"
            />
            
            <TextField
              id="demo-link"
              value={demoLink}
              label="Demo Link (Live site or Video)"
              fullWidth
              margin="normal"
              onChange={(e) => setDemoLink(e.target.value)}
              placeholder="https://myproject.com or https://youtube.com/watch?v=..."
            />

            <button type="submit" id="np-button" style={{ marginTop: "16px" }}>
              Post Project
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
}
