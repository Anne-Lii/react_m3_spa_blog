import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContex";
import './Header.css'

const Header = () => {

  const { user, logout } = useAuth();

  //navigation with logged-in status and not logged-in status
  return (
    <header>
        <ul>
          <li><NavLink to="/">Bloggen</NavLink></li>
            {!user ? (
              <li><NavLink to="/login">Logga in</NavLink></li>
            ) : (
              <>
                <li><NavLink to="/admin">Admin</NavLink></li>
                <li><NavLink to="/login" onClick={logout}>Logga ut</NavLink></li>
              </>
            )}
      </ul>
    </header>
  )
}

export default Header
