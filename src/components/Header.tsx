import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContex";

const Header = () => {

  const { user, logout } = useAuth();

  return (
    <header>
        <ul>
            <li><NavLink to='/'>Bloggen</NavLink></li>
            {
            !user ? 
              (<li><NavLink to='/login'>Logga in</NavLink></li>) : 
              (<li><NavLink to="/login" onClick={logout}>Logga ut</NavLink></li>)}
        </ul>
    </header>
  )
}

export default Header
