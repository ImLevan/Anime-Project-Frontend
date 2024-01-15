import { FaSignOutAlt, FaTimes, FaUser } from "react-icons/fa";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from '../Routes/routes';
import "./Header.css";

const Navbar = (props) => {

    // eslint-disable-next-line react/prop-types
    const {loginSelected, isAuthenticated, toggleSubMenu, isSubMenuOpen, usernameC, logOut} = props;

    const rightNavbarItems = [
        { name: 'Empezar', path: `/${PrivateRoutes.HOME}` },
      ];

    return (
      <div>
        <ul id="navbar">
          {!loginSelected && (
            rightNavbarItems.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>
                  {item.name}
                </Link>
              </li>
            ))
          )}

          {/* Añadir el ítem del usuario con el submenú */}
          {!isAuthenticated && !loginSelected && (
            <li>
              <Link to="#" onClick={toggleSubMenu}>
                <FaUser />
              </Link>
              {isSubMenuOpen && (
                <ul className="submenu">
                  <div className='options-container'>
                    <li>
                      <Link to={`/${PublicRoutes.REGISTER}`}>
                        <div className="option-li">
                          <p>Crear una cuenta</p>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${PublicRoutes.LOGIN}`}>
                        <div className="option-li">
                          <p>Acceder</p>
                        </div>
                      </Link>
                    </li>
                  </div>
                </ul>
              )}
            </li>
          )}

          {isAuthenticated && (
            <li>
              <Link to="#" onClick={toggleSubMenu}>
                <AccountCircleIcon />
              </Link>
              {isSubMenuOpen && (
                <ul className="submenu">
                  <div className='options-container'>
                    <p className="welcome-p">Hola!, bienvenido {usernameC} </p>
                    <li>
                      <div className='div-logout'>
                        <button className="logout-button" onClick={logOut}>
                          <p><FaSignOutAlt color='white' /></p>
                          <p>Cerrar Sesión</p>
                        </button>
                      </div>
                    </li>
                  </div>
                </ul>
              )}
            </li>
          )}
          <Link to="#" id="close">
            <FaTimes />
          </Link>
        </ul>
      </div>
    );
};

export default Navbar;