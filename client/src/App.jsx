import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import AllBlog from "./components/Blog/AllBlog";
import AllProjects from "./components/Projects/AllProjects";
import AllReviews from "./components/Reviews/AllReviews";
import Contact from "./components/Contact";
import CreateBlog from "./components/Blog/CreateBlog";
import EditBlog from "./components/Blog/EditBlog";
import CreateProject from "./components/Projects/CreateProject";
import EditProject from "./components/Projects/EditProject";
import CreateReview from "./components/Reviews/CreateReview";
import EditReview from "./components/Reviews/EditReview";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/blogs" element={<AllBlog />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/reviews" element={<AllReviews />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/post-blog" element={<CreateBlog />} />
        <Route path="/edit-blog" element={<EditBlog />} />
        <Route path="/post-project" element={<CreateProject />} />
        <Route path="/edit-project" element={<EditProject />} />
        <Route path="/post-review" element={<CreateReview />} />
        <Route path="/edit-review" element={<EditReview />} />
      </Routes>
    </>
  );
}

export default App;
