import { NavLink } from "react-router-dom";
//import "./Nav.css";

function Nav() {
  return (
    <nav>
      <div className="page-links">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/wishlist">Wish List</NavLink>
        <NavLink to="/sellers">All Sellers</NavLink>
        <NavLink to="/page3">Page 3</NavLink>
      </div>
    </nav>
  );
}

export default Nav;
