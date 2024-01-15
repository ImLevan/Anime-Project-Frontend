import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PublicRoutes } from "../Routes/routes";
import Cookies from "universal-cookie";
import { UserContext } from "../context/UsersContext";

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    //Cambie la logica, ahora se checkea si la cookie existe, para autenticar al usuario
    const cookies = new Cookies();
    const userCookie = cookies.get('user');
    const {isAuthenticated} = useContext(UserContext);
  
    useEffect(() => {
      if (!userCookie && !isAuthenticated) {
        navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
      }
    }, [userCookie, isAuthenticated, navigate]);
  
    return userCookie ? children : null;
  }
  
export default ProtectedRoute;
