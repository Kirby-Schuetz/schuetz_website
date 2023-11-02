const express = require('express');
const router = express.Router();

const { createProject, getAllProjects, getSingleProject, updateProject, deleteProject } = require('../db/helpers/projectshelper');

// POST new project
router.post('/', async (req, res, next) => {
    try{
        console.log("Express route: ", req.body);
        const project = await createProject(req.body);
        res.send(project);
    } catch(error) {
        next(error);
    }
});

// GET all projects
router.get('/', async (req, res, next) => {
    try{
        const projects = await getAllProjects();
        res.send(projects);
    } catch (error) {
        next(error);
    }
});

// GET single project
router.get('/:project_id', async (req, res, next) => {
    try{
        const project = await getSingleProject(req.params.project_id);
        res.send(project);
    } catch (error) {
        next(error);
    }
})

// PUT update project
router.put('/:project_id', async (req, res, next) => {
    try{
        const project = await updateProject(req.params.project_id, req.body);
        res.send(project);
    } catch (error) {
        next(error);
    }
});

// DELETE project
router.delete('/:project_id', async (req, res, next) => {
    try{
        const project = await deleteProject(req.params.project_id);
        res.send(project);
    } catch (error) {
        next(error);
    }
});

// export router
module.exports = router;