import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UsersContext";
import { PublicRoutes } from "../../Routes/routes";
import { Link } from "react-router-dom";
import LoginInputForm from "../../components/LoginInputForm";
//import Loading from "../../components/Loading";
import "./login.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const MAX_LOGIN_ATTEMPTS = 5; // Número máximo de intentos de inicio de sesión permitidos
const LOCKOUT_DURATION = 60000; // Duración en milisegundos del bloqueo temporal (1 minuto)

const Login = () => {
  //const [isValidUser, setIsValidUser] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLockedOut, setIsLockedOut] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [loading, setLoading] = useState(false);
  const {
    showSpanPasswordOrUser,
    username,
    password,
    isAuthenticated,
    login,
    setUsernameState,
    setPasswordState,
    navigate,
    authUser,
    setShowSpanPasswordOrUser
  } = useContext(UserContext);

  

  useEffect(() => {
    if (isAuthenticated) {
      navigate(PublicRoutes.LANDING); // Redirect to the home page if already authenticated
    }
  }, [isAuthenticated, navigate]);

  //Bloquea al usuario cuando los intentos fueron mas de 4 y establece el tiempo de espera
  useEffect(() => {
    let interval;

    if (isLockedOut) {
      setTimeRemaining(LOCKOUT_DURATION);

      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1000);
      }, 1000);
    } else {
      setTimeRemaining(0);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isLockedOut]);

  //Si el tiempo se termino, vuelve a permitirle al usuario loguear y borra el mensaje
  useEffect(() => {
    if (timeRemaining <= 0) {
      setIsLockedOut(false);
      setLoginAttempts(0);
    }
  }, [timeRemaining]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLockedOut) {
      return; // Return early if the user is locked out
    }

    setLoading(true);

    try {
      const dataLogin =  await authUser({ username, password });
      const { id, auth} = dataLogin;
      if (auth) {
        login(id);
      } else {
        setLoginAttempts(loginAttempts + 1);

        if (loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS) {
          setIsLockedOut(true);
          setTimeout(() => {
            setIsLockedOut(false);
            setLoginAttempts(0); // Reset login attempts after the lockout period
          }, LOCKOUT_DURATION);
        }
      }
    } catch (error) {
      // Manejar errores si la autenticación falla
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-root">
        <Header section={"Iniciar Sesion"}/>
        <div className="login-container">
          <form
            className="form-login"
            action=""
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <h2 className="login-container__form-h2">Bienvenido</h2>
            <img src="asd" className="logo" alt="" />
            <LoginInputForm
              usernameState={username}
              setUsernameState={setUsernameState}
              passwordState={password}
              setPasswordState={setPasswordState}
              setShowSpanPasswordOrUser={setShowSpanPasswordOrUser}
            />
            <span
              className="spans"
              id="login-span"
              style={
                (showSpanPasswordOrUser || isLockedOut)
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              {isLockedOut
                ? `Has excedido el número máximo de intentos. Intenta de nuevo después de ${LOCKOUT_DURATION / 1000} segundos. Cuando desaparezca este cartel.`
                :"Usuario o contraseña incorrecta. Intentelo nuevamente"}
            </span>
            <div className="div-buttons">
              <input
                className="login-button"
                type="submit"
                value="Acceder"
                id="sign-in-button"
              />
            </div>
            <div className="div-link-login">
              <p>¿No tienes una cuenta?</p> 
              <Link to={"/signup"} className="link-login">
                  Crear cuenta
              </Link>
            </div>
          </form>
          {loading && <p>loading</p>}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Login;