import { Link } from "react-router-dom";
import "../css/NavBar.css"

export default function NavBar() {
    return (
        <div className={"navbar"}>
            <div className="nav-brand">
                <Link to="/">Movie Shop</Link>
            </div>
            <div className="nav-links">
                <Link to="/" className={"nav-link"}>Home</Link>
                <Link to="/favourites" className={"nav-link"}>favourites</Link>
            </div>
        </div>
    )
}