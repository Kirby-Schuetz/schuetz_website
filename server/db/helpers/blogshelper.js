const client = require("../client")

const createBlog = async ({blog_title, blog_post}) => {
    const inputParams = {
        blog_title: blog_title,
        blog_post: blog_post
    };
    console.log("DB Handler: ", inputParams);
    try {
        const {
            rows: [blog],
        } = await client.query (
            `
            INSERT INTO blogs(blog_title, blog_post)
            VALUES($1, $2)
            RETURNING *
            `,
            [blog_title, blog_post]
        )
        return blog
    } catch (error) {
        throw error
    }
}

const getAllBlogs = async () => {
    try {
        const { rows }
        = await client.query(`
        SELECT *
        FROM blogs;
        `)
        return rows
    } catch (error) {
        throw error
    }
}

const getSingleBlog = async (blog_id) => {
    try {
        const {
            rows: [blogs]
        }
        = await client.query(`
        SELECT *
        FROM blogs
        WHERE blog_id = ${blog_id};
        `)
        return blogs
    } catch (error) {
        throw error
    }
}

module.exports = { createBlog, getAllBlogs, getSingleBlog }