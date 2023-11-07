const express = require('express');
const router = express.Router();

const { createBlog, getAllBlogs, getSingleBlog, updateBlog, deleteBlog } = require('../db/helpers/blogshelper');

// POST new blog
router.post('/', async (req, res, next) => {
    try{
        console.log("Express route: ", req.body);
        const blog = await createBlog(req.body);
        res.send(blog);
    } catch(error) {
        next(error);
    }
});

// GET all blogs
router.get('/', async (req, res, next) => {
    console.log("Request all blogs");
    try{
        const blogs = await getAllBlogs();
        res.send(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
});

// GET single blog
router.get('/:blog_id', async (req, res, next) => {
    try{
        const blog = await getSingleBlog(req.params.blog_id);
        res.send(blog);
    } catch (error) {
        next(error);
    }
})

// PUT edit blog
router.put('/:blog_id/edit', async (req, res, next) => {
    const blogId = req.params.blog_id;
    const updatedBlog = req.body;
    try {
        const updatedBlogFromDB= await updateBlog(blogId, updatedBlog);
        res.status(200).json({message: 'Blog post updated successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
});

// DELETE blog
router.delete('/:blog_id', async (req, res, next) => {
    try{
        const blog = await deleteBlog(req.params.blog_id);
        res.send(blog);
    } catch (error) {
        next(error);
    }
});

// export router
module.exports = router;