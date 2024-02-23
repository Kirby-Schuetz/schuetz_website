import "./App.css";
import { Routes, Route, Router } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import AllBlog from "./components/Blog/AllBlog";
import AllProjects from "./components/Projects/AllProjects";
// import AllReviews from "./components/Reviews/AllReviews";
import Contact from "./components/Contact";
import CreateBlog from "./components/Blog/CreateBlog";
import EditBlog from "./components/Blog/EditBlog";
import CreateProject from "./components/Projects/CreateProject";
import EditProject from "./components/Projects/EditProject";
import CreateReview from "./components/Reviews/CreateReview";
import EditReview from "./components/Reviews/EditReview";
import LoginPage from "./components/LoginPage";
import LogoutPage from "./components/LogoutPage";
import { LoginProvider } from './components/Context/LoginContext';

function App() {
  return (
    <>
      <LoginProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/blogs" element={<AllBlog />} />
        <Route path="/projects" element={<AllProjects />} />
        {/* <Route path="/reviews" element={<AllReviews />} /> */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogform" element={<CreateBlog />} />
        <Route path="/blogs/:blog_id/edit" element={<EditBlog />} />
        <Route path="/projectform" element={<CreateProject />} />
        <Route path="/projects/:project_id/edit" element={<EditProject />} />
        <Route path="/reviewform" element={<CreateReview />} />
        <Route path="/reviews/:review_id/edit" element={<EditReview />} />
      </Routes>
      </LoginProvider>
    </>
  );
}

export default App;
