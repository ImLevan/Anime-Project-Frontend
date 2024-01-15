/*eslint-disable */
import { createContext, useEffect, useState } from "react";
import {
  PostNewUser,
  PostToken,
  authLogin
} from "../api/API-methods";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { clearSession, persistSession } from "../utilities/cookies.utilities";


export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const cookie = new Cookies();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userValueError, setUserValueError] = useState("");
  const [userCodeError, setUserCodeError] = useState("");
  const navigate = useNavigate();

  const [showSpanPasswordOrUser, setShowSpanPasswordOrUser] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSpanAlreadyExistsUser, setSpanAlreadyExistsUser] = useState(false);
  const [showSpanErrorCode, setSpanErrorCode] = useState(false);
  const [isAuthToken, setIsAuthToken] = useState(false);

  const readCookie = () => {
    const user = cookie.get("user");
    if (user) {
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    readCookie();
  }, []);

  const setUsernameState = (value) => setUsername(value);
  const setPasswordState = (value) => setPassword(value);
  const setUserValueErrorState = (value) =>
    setUserValueError(value);

  const login = (id) => {
    persistSession(username, password, cookie, id)
    setIsAuthenticated(true);
  };

  const authUser = async (user) => {
    const authUserQuery = await authLogin(user);
    const { userID, value, authLoginBoolean} = authUserQuery;
    if (authLoginBoolean) {
      return {id: userID, auth: authLoginBoolean};
    }
    setShowSpanPasswordOrUser(true);
    return false;
  };

  const logOut = () => {
    clearSession(setUsername, setPassword, setIsAuthenticated, cookie)
  };

  async function saveUser(userData) {
    const postUser = await PostNewUser(userData);
    const { userID, value, registeredUser } = postUser;
    if (registeredUser) {
      // window.alert("REGISTRADO!");
      setIsAuthToken(true);
      //Aca deberia poner algo para recuperar la id del usuario, y pasarlo como parametro a la ruta
      navigate(`/auth-token/${userID}`);
    } else {
      if (value) {
        setUserValueErrorState(value);
      }
      setSpanAlreadyExistsUser(true);
    }
  }

  async function sendCode(userCode) {
    const postCode = await PostToken(userCode);
    const { value, authenticatedUser } = postCode;
    if (authenticatedUser) {
      window.alert("Verificacion exitosa");
      setIsAuthToken(false);
      navigate("/login");
    } else {
      if (value) {
        setUserCodeError(value);
      }
      setSpanErrorCode(true); //TODO: RENOMBRAR
    }
  }

  const providerValue = {
    authUser,
    login,
    logOut,
    // isRegistered,
    showSpanPasswordOrUser,
    setUsernameState,
    setPasswordState,
    username,
    password,
    isAuthenticated,
    cookie,
    navigate,
    setUserValueErrorState,
    setUserCodeError,
    userValueError,
    userCodeError,
    setShowSpanPasswordOrUser,
    showSpanAlreadyExistsUser,
    showSpanErrorCode,
    saveUser,
    setSpanAlreadyExistsUser,
    setSpanErrorCode,
    isAuthToken,
    setIsAuthToken,
    sendCode,
  };

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;