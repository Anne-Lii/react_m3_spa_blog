import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
    <nav>
        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Hem</NavLink>
        <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>Logga in</NavLink>
    </nav>
    );
};

export default Navigation;