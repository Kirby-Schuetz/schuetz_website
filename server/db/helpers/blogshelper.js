const client = require("../client")

const createBlog = async ({blog_title, blog_post, blog_image}) => {
    const inputParams = {
        blog_title: blog_title,
        blog_post: blog_post,
        blog_image: blog_image
    };
    console.log("DB Handler: ", inputParams);
    try {
        const {
            rows: [blog],
        } = await client.query (
            `
            INSERT INTO blogs(blog_title, blog_post, blog_image)
            VALUES($1, $2, $3)
            RETURNING *
            `,
            [blog_title, blog_post, blog_image]
        )
        return blog
    } catch (error) {
        throw error
    }
};

const getAllBlogs = async () => {
    try {
        const { rows }
        = await client.query(`
        SELECT *
        FROM blogs;
        `)
        for (const row of rows) {
            row.blog_image = _bytesToString(row.blog_image);
        }
        return rows;
    } catch (error) {
        throw error
    }
};

const getSingleBlog = async (blog_id) => {
    const query = `SELECT * FROM blogs WHERE blog_id = $1`;
    const values = [blog_id]
    try {
        const result = await client.query(query, values);
        let blog = result.rows[0];
        blog.blog_image = _bytesToString(blog.blog_image);
        return blog
    } catch (error) {
        throw error
    }
};

const _bytesToString = (bytes) => {
    const buffer = Buffer.from(bytes);
    const string = buffer.toString();
    return string;
};

const updateBlog = async (blog_id, updatedBlog) => {
    try {
        const query = `
        UPDATE blogs
        SET
        blog_title = $1,
        blog_post = $2,
        blog_image = $3
        WHERE blog_id = ${blog_id}
        RETURNING *;
        `;
        const values =
        [
            updatedBlog.blog_title,
            updatedBlog.blog_post,
            updatedBlog.blog_image
        ]
        const { rows: [blog], } = await client.query(query, values);

        return blog;
    } catch (error) {
        throw error;
    }
};

const deleteBlog = async (blog_id) => {
    try {
        const { rows: [blog], }
        = await client.query(`
        DELETE 
        FROM blogs
        WHERE blog_id = ${blog_id};
        `);
        } catch (error) {
         throw error;
    }
};

module.exports = { createBlog, getAllBlogs, getSingleBlog, updateBlog, deleteBlog }