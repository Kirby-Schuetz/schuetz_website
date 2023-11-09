import { Link } from "react-router-dom";
import learnLogo from "../assets/learnLogo.png";
import { useState } from "react";
import "../App.css"; // Replace with the correct path to your CSS file

export default function NavBar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <nav className="navBar">
      <img className="navLogo" src={learnLogo} alt="learning techodyssey logo" />
      <label 
      className="menu-button-container"
      >
      <button
        type="button"
        id="menu-toggle"
        className={`menu-button ${isNavExpanded ? 'active' : ''}`}
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        <svg viewBox="0 0 10 8" width="40">
          <path
            d="M1 1h8M1 4h 8M1 7h8"
            stroke="#000"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      </label>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <ul className="navigation-menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blogs">Blog</Link>
          </li>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
          <li>
            <Link to="/reviews">Reviews</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

