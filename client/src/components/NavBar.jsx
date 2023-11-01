import { Link } from "react-router-dom";

export default function NavBar() {

    return (
        <div>
            <nav className="navBar">
                <Link to="/">Home</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/reviews">Reviews</Link>
                <Link to="/contact">Contact</Link>
            </nav>
        </div>
    );
}