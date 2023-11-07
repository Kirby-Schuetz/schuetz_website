const BASE_URL = "http://localhost:5005/api/blogs";

// GET all blogs
export async function fetchAllBlogs() {
    console.log("Fetching blogs");
    try {
        const response = await fetch(`${BASE_URL}/`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log("No blogs!", error);
        return error;
    }
}

// POST create a new blog
export async function createBlog(postData) {
    console.log("API Client: ", postData);
    try {
        const response = await fetch(`${BASE_URL}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData)
        });
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.log("Your blog did not post. Try again!", error);
    }
}

// GET blog by blog_id
export async function fetchBlogByBlogId(blog_id) {
    console.log("Fetching single blog")
    try {
        const response = await fetch(`${BASE_URL}/${blog_id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// PUT edit blog
export const editBlog = async (blog_id, blogEdits) => {
    console.log("Submiting edits")
    try {
        const response = await fetch(`${BASE_URL}/${blog_id}/edit`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(blogEdits)
        });
            const result = await response.json();
            console.log(result);
            return result;
    } catch (error) {
        console.log("Your blog did not update. Try again!", error);
    }
}

// DELETE blog
export async function deleteBlog(blog_id) {
    console.log("Deleting post")
    try {
        const response = await fetch(`${BASE_URL}/${blog_id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            }
        });
            const result = await response.json();
            return result;
    } catch (error) {
        console.log("Your post did not delete. Try again!", error);
    }
}