const client = require("../client")

const createProject = async ({ project_title, project_summary}) => {
    const inputParams = {
        project_title: project_title,
        project_summary: project_summary
    };
    console.log("DB Handler: ", inputParams);
    try {
        const {
            rows: [project],
        } = await client.query (
            `
            INSER INTO project(project_title, project_summary)
            VALUES($1, $2)
            RETURNING *
            `,
            [project_title, project_summary]
        )
        return project
    } catch (error) {
        throw error
    }
}

const getAllProjects = async () => {
    try {
        const { rows }
        = await client.query(`
        SELECT *
        FROM projects;
        `)
        return rows
    } catch (error) {
        throw error
    }
}

const getSingleProject = async (project_id) => {
    try {
        const {
            rows: [projects]
        }
        = await client.query(`
        SELECT *
        FROM projects
        WHERE project_id = ${project_id};
        `)
        return projects
    } catch (error) {
        throw error
    }
}

module.exports = { createProject, getAllProjects, getSingleProject }