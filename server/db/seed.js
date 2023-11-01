// pull in connection to my local database
const client = require('./client')

const { blogshelper, projectshelper, reviewshelper } = require('./seedData')

// drop tables
const dropTables = async () => {
    try {
        console.log("starting to drop tables")
        await client.query(`
        DROP TABLE IF EXISTS blogs;
        DROP TABLE IF EXISTS projects;
        DROP TABLE IF EXISTS reviews;
        `)
        console.log("tables dropped")
    } catch (error) {
        console.log("error dropping tables")
        throw error
    }
}

// create tables
const createTables = async () => {
    console.log("building tables")
    await client.query(`
    CREATE TABLE blogs (
        blog_id SERIAL PRIMARY KEY,
        blog_title varchar,
        blog_post varchar,
        created_at TIMESTAMP
    );
    CREATE TABLE projects (
        project_id SERIAL PRIMARY KEY,
        project_title varchar,
        project_summary varchar,

    );
    CREATE TABLE reviews (
        review_id SERIAL PRIMARY KEY,
        review_title varchar,
        review_summary varchar,
        review_image varchar
    )
    `)
    console.log("tables are built")
}

// create initial items

// create blogs
const createInitialBlogs = async () => {
    try {
        for (const blog of blogs) {
            await createInitialBlogs(blog)
        }
        console.log("created blogs")
    } catch (error) {
        throw error
    }
}

// create projects
const createInitialProjects = async () => {
    try {
        for (const project of projects) {
            await createInitialProjects(project)
        }
        console.log("created projects")
    } catch (error) {
        throw error
    }
}

// create reviews
const createInitialReviews = async () => {
    try {
        for (const review of reviews) {
            await createInitialReviews(review)
        }
        console.log("created reviews")
    } catch (error) {
        throw error
    }
}

// rebuild db
const rebuildDb = async () => {
    try {
        client.connect()
        await dropTables()
        await createTables()

        console.log("starting to seed")
        await createInitialBlogs()
        await createInitialProjects()
        await createInitialReviews()
    
    } catch(error) {
        console.log(error)
    } finally {
        client.end()
    }
}

rebuildDb()