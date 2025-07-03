import { useState, useEffect } from "react";
import { fetchAllProjects } from "../../API/projects";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from '../Context/LoginContext';


// Helper function to convert markdown links to HTML links
function formatProjectPost(text) {
  if (!text) return "";
  
// Convert markdown links [text](url) to HTML links
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const formattedText = text.replace(linkRegex, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  
// Split content at "---" to separate description from links
  const parts = formattedText.split('---');
  
  if (parts.length > 1) {
    return (
      <>
        <p className="project-description">{parts[0].trim()}</p>
        <div className="project-links" dangerouslySetInnerHTML={{ __html: parts[1].trim() }} />
      </>
    );
  }
  
  return <p>{formattedText}</p>;
}


export default function AllProject() {
  const { isLoggedIn } = useLogin();
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
          {isLoggedIn && (
          <button className="addButton">
            <Link to={`/projectform`}>Add Project Post</Link>
          </button>
          )}
          <div></div>

          {Array.isArray(projects) && projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.project_id} className="posts">
                <Card style={{ background: "#f1efdf", color: "#333" }}>
                  <h2>{project.project_title}</h2>
                  <CardMedia>
                    <img
                      src={project.project_image}
                      alt={project.project_title}
                    />
                  </CardMedia>
                  <CardContent>
                    <div className="prject-content">
                      {formatProjectPost(project.project_post)}
                      </div>
                  </CardContent>
                  {isLoggedIn && (
                  <button>
                    <Link to={`/projects/${project.project_id}/edit`}>
                      Edit Project Post
                    </Link>
                  </button>
                  )}
                </Card>
              </div>
            ))
          ) : (
            <div>No projects available</div>
          )}
        </div>
      )}
    </>
  );
}
