const BASE_URL = "http://localhost:5005/api/projects";

// GET all projects
export async function fetchAllProjects() {
    console.log("Fetching projects");
    try {
        console.log("URL: ", `${BASE_URL}/`);
        const response = await fetch(`${BASE_URL}/`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log("No projects", error);
        return error;
    }
}
// POST create a new project
export async function createProject(postData, token) {
    console.log("API Client: ", postData)
    try {
        const response = await fetch(`${BASE_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "applicatin/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(postData)
        });
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.log("Your project did not post", error);
    }
}
// GET project by project_id
export async function getProjectByProjectId(project_id) {
    try {
        const response = await fetch(`${BASE_URL}/${project_id}`);
        if (response.status === 204) {
            const result = await response.json();
            return result;
        }
    } catch (error) {
        console.error(error);
    }
}
// PUT edit project
export const editProject = async (projectEdits, project_id, token) => {
    try {
      const response = await fetch(`${BASE_URL}/${project_id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(projectEdits)
      });
      if (response.status === 202) {
        const result = await response.json();
        return result;
      }
    } catch (error) {
      console.log("Your project did not update. Try again!", error);
    }
  }
// DELETE project
export async function deleteProject(project_id, token) {
    try {
        const response = await fetch(`${BASE_URL}/${project_id}`, {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 201) {
          const result = await response.json();
          return result;
        }
        
    } catch (error) {
        console.log("Your project did not delete. Try again!", error);
    }
}