// pull in connection to my local database
const client = require("./client");

const { createUser } = require("./helpers/usershelper");
const { createBlog } = require("./helpers/blogshelper");
const { createProject } = require("./helpers/projectshelper");
const { createReview } = require("./helpers/reviewshelper");

const { users, blogs, projects, reviews } = require("./seedData");

// drop tables
const dropTables = async () => {
  try {
    console.log("starting to drop tables");
    await client.query(`
        DROP TABLE IF EXISTS blogs;
        DROP TABLE IF EXISTS projects;
        DROP TABLE IF EXISTS reviews;
        DROP TABLE IF EXISTS users;
        `);
    console.log("tables dropped");
  } catch (error) {
    console.log("error dropping tables");
    throw error;
  }
};

// create tables
const createTables = async () => {
  console.log("building tables");
  await client.query(`
    CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        username varchar,
        password varchar
    );

    CREATE TABLE blogs (
        blog_id SERIAL PRIMARY KEY,
        blog_title varchar,
        blog_post varchar,
        blog_image varchar,
        created_at TIMESTAMP,
        user_id INT REFERENCES users(user_id) ON DELETE CASCADE
    );
    CREATE TABLE projects (
        project_id SERIAL PRIMARY KEY,
        project_title varchar,
        project_post varchar,
        project_image varchar,
        user_id INT REFERENCES users(user_id) ON DELETE CASCADE

    );
    CREATE TABLE reviews (
        review_id SERIAL PRIMARY KEY,
        review_title varchar,
        review_post varchar,
        review_image varchar,
        user_id INT REFERENCES users(user_id) ON DELETE CASCADE

    )
    `);
  console.log("tables are built");
};

// create initial items

// create user
const createInitialUser = async () => {
  try {
    for (const user of users) {
      await createUser(user);
    }
    console.log("created user");
  } catch (error) {
    throw error;
  }
  console.log(users);
};

// create blogs
const createInitialBlog = async () => {
  try {
    for (const blog of blogs) {
      await createBlog(blog);
    }
    console.log("created blogs");
  } catch (error) {
    throw error;
  }
};

// create projects
const createInitialProject = async () => {
  try {
    for (const project of projects) {
      await createProject(project);
    }
    console.log("created projects");
  } catch (error) {
    throw error;
  }
};

// create reviews
const createInitialReview = async () => {
  try {
    for (const review of reviews) {
      await createReview(review);
    }
    console.log("created reviews");
  } catch (error) {
    throw error;
  }
};

// rebuild db
const rebuildDb = async () => {
  try {
    client.connect();
    await dropTables();
    await createTables();

    console.log("starting to seed");
    await createInitialUser();
    await createInitialBlog();
    await createInitialProject();
    await createInitialReview();
  } catch (error) {
    console.log(error);
  } finally {
    client.end();
  }
};

rebuildDb();
