const BASE_URL = "http://localhost:5005/api/blogs";

// GET all blogs
export async function fetchAllBlogs() {
    console.log("Fetching blogs");
    try {
        console.log("URL: ", `${BASE_URL}/`);
        const response = await fetch(`${BASE_URL}/`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log("No blogs!", error);
        return error;
    }
}

// POST create a new blog
export async function createBlog(postData, token) {
    console.log("API Client: ", postData);
    try {
        const response = await fetch(`${BASE_URL}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
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
export async function getBlogByBlogId(blog_id) {
    try {
        const response = await fetch(`${BASE_URL}/${blog_id}`);
        if (response.status === 204) {
            const result = await response.json();
            return result;
        }
    } catch (error) {
        console.log(error);
    }
}

// PUT edit blog
export const editBlog = async (blogEdits, blog_id, token) => {
    try {
        const response = await fetch(`${BASE_URL}/${blog_id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'appication/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(blogEdits)
        });
        if (response.status === 202) {
            const result = await response.json();
            return result;
        }
    } catch (error) {
        console.log("Your blog did not update. Try again!", error);
    }
}

// DELETE blog
export async function deleteBlog(blog_id, token) {
    try {
        const response = await fetch(`${BASE_URL}/${blog_id}`, {
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
        console.log("Your post did not delete. Try again!", error);
    }
}