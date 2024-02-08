import { Link } from "react-router-dom";
import learnLogo from "../assets/learnLogo.png";
import backgroundTile from "../assets/backgroundTile.png";
import { useState } from "react";
import { useLogin } from "../components/Context/LoginContext";
import "../App.css"; // Replace with CSS file

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
      <div className="logo-container">
        {isNavExpanded ? (
          <Link to="/" className="navLogo" onClick={closeNav}>
            <img
              src={learnLogo}
              alt="learning techodyssey logo"
              width="200"
              height="300"
            />
          </Link>
        ) : (
          <img
            className="navLogo"
            src={learnLogo}
            alt="learning techodyssey logo"
            width="200"
            height="300"
          />
        )}
      </div>
      <button className="hamburger" onClick={toggleNav}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      <div className="nav-container">
        <div className={`nav-links ${isNavExpanded ? "expanded" : ""}`}>
          <div className="background-container">
            {isNavExpanded ? null : (
              <img
                className="backgroundTile"
                src={backgroundTile}
                alt="learning techodyssey logo"
              />
            )}
          </div>
          <Link to="/" onClick={closeNav}>
            Home
          </Link>
          <Link to="/blogs" onClick={closeNav}>
            Blog
          </Link>
          <Link to="/projects" onClick={closeNav}>
            Projects
          </Link>
          <Link to="/reviews" onClick={closeNav}>
            Reviews
          </Link>
          <Link to="/contact" onClick={closeNav}>
            Contact
          </Link>
          {isLoggedIn ? (
            <Link to="/logout" onClick={closeNav}>
              Logout
            </Link>
          ) : (
            <Link to="/login" onClick={closeNav}>
              Login
            </Link>
          )}
          <a href="#" className="close" onClick={closeNav}></a>
        </div>
      </div>
    </nav>
  );
}
