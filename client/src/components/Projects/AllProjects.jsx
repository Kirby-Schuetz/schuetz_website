import { useState, useEffect } from "react";
import { fetchAllProjects } from "../../API/projects";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Link, useNavigate } from "react-router-dom";

export default function AllProject() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProject() {
      try {
        const storedProjects = await fetchAllProjects();
        console.log(storedProjects);
        setProjects(storedProjects);
      } catch (error) {
        setError(`Error: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProject();
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          <h1 className="header">projects</h1>
          <button>
            <Link to={`/projectform`}>Add Project Post</Link>
          </button>
          {projects.map((project) => (
            <div key={project.project_id} className="posts">
              <Card style={{ background: "#FBFBED", color: "#1E221F" }}>
                <h2>{project.project_title}</h2>
                <CardMedia>
                  <img
                    src={project.project_image}
                    alt={project.project_title}
                  />
                </CardMedia>
                <CardContent>
                  <h3>{project.project_post}</h3>
                </CardContent>
                <button>
                  <Link to={`/projects/${project.project_id}/edit`}>
                    Edit Project Post
                  </Link>
                </button>
              </Card>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
