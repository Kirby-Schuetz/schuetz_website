import { Link } from "react-router-dom";
import learnLogo from "../assets/learnLogo.png";
import backgroundTile from "../assets/backgroundTile.png";
import { useState } from "react";
import { useLogin } from "../components/Context/LoginContext";
import "../App.css"; // Replace with path to CSS file

export default function NavBar() {
  const { isLoggedIn } = useLogin();
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const toggleNav = () => {
    setIsNavExpanded(!isNavExpanded);
  };

  const closeNav = () => {
    setIsNavExpanded(false);
  };

  return (
    <nav className={`navbar ${isNavExpanded ? "expanded" : ""}`}>
      <div className="background-container">
        <img className="backgroundTile" src={backgroundTile} alt="background" />
      </div>
      <button className="hamburger" onClick={toggleNav}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      <div className="menu-text">{isNavExpanded ? null : "menu"}</div>
      <div className="nav-container">
        <div className={`nav-links ${isNavExpanded ? "expanded" : ""}`}>
          <Link to="/" className="navLogo" onClick={closeNav}>
            <img src={learnLogo} alt="learning techodyssey logo" width="200" height="300" />
          </Link>
          <Link to="/blogs" onClick={closeNav}>
            blog
          </Link>
          <Link to="/projects" onClick={closeNav}>
            projects
          </Link>
          {/* <Link to="/reviews" onClick={closeNav}>
            reviews
          </Link> */}
          <Link to="/contact" onClick={closeNav}>
            contact
          </Link>
          {isLoggedIn ? (
            <Link to="/logout" onClick={closeNav}>
              logout
            </Link>
          ) : (
            <Link to="/login" onClick={closeNav}>
              login
            </Link>
          )}
          <a href="#" className="close" onClick={closeNav}></a>
        </div>
      </div>
    </nav>
  );
}