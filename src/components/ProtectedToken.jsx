import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UsersContext";
import { PublicRoutes } from "../Routes/routes";

// eslint-disable-next-line react/prop-types
function ProtectedToken({ children }) {
    const navigate = useNavigate();
    const { isAuthToken } = useContext(UserContext);
  
    useEffect(() => {
      if (!isAuthToken) {
        navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
      }
    }, [isAuthToken, navigate]);
  
    return isAuthToken ? children : null;
  }
  
export default ProtectedToken;