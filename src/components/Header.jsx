import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";
import { PublicRoutes} from '../Routes/routes';
import setupHeaderMenu from '../utilities/navbarMobile';
import { FaOutdent} from 'react-icons/fa';
import { UserContext } from "../context/UsersContext";
import Cookies from 'universal-cookie';
import logo from "../assets/images/logo.png";
import Navbar from './Navbar';

// eslint-disable-next-line react/prop-types
const Header = ({ section }) => {
  const [loginSelected, setLoginSelected] = useState(false);
  const { isAuthenticated, logOut } = useContext(UserContext);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const cookies = new Cookies();
  const userCookie = cookies.get('user');
  const usernameC = userCookie ? userCookie.username : null;


  //TO DO
  // const leftNavbarItems = [
  //   { name: 'Explorar', path: `/explore` },
  //   { name: 'Noticias', path: `/news` },
  //   { name: 'Precios', path: `/pricing` },
  // ];

  useEffect(() => {
    setupHeaderMenu();
  }, [])

  useEffect(() => {
    // Comprueba si la sección actual es "Iniciar Sesion" o "Registrarse"
    setLoginSelected(section === 'Iniciar Sesion' || section === 'Registrarse');
  }, [section]);

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <section id="header">
      <div className='logo-and-sections'>
        <Link to={"/" + PublicRoutes.LANDING}>
          <img src={logo} className="logo" alt="" />
        </Link>
        {/* <ul id='navbar'>
          {leftNavbarItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path}>
                {item.name}
              </Link>
            </li>
          ))
          }
        </ul> */}
      </div>
      <Navbar 
        loginSelected={loginSelected}
        isAuthenticated={isAuthenticated}
        toggleSubMenu={toggleSubMenu}
        isSubMenuOpen={isSubMenuOpen}
        usernameC={usernameC}
        logOut={logOut}
      />
      <div id="mobile">
        <FaOutdent id="bar" size={22} />
      </div>
    </section>
  );
};

export default Header;
