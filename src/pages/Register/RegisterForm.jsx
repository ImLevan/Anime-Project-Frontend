import { useContext, useEffect, useState } from "react";
import "./register.css";
import { UserContext } from "../../context/UsersContext";
import { Link } from "react-router-dom";
import { inputs } from "./registerInputs";
import FormInput from "../../components/FormInput";
import { PrivateRoutes } from "../../Routes/routes";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const RegisterForm = () => {
    const [values, setValues] = useState({
      username: "",
      email: "",
      password: "",
    });
  
    const { saveUser, showSpanAlreadyExistsUser, setSpanAlreadyExistsUser, userValueError, isAuthenticated, navigate } = useContext(UserContext)
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      await saveUser(values)
    };
  
    const onChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
      setSpanAlreadyExistsUser(false);
    };

    useEffect(() => {
      if (isAuthenticated) {
        navigate(PrivateRoutes.HOME); // Redirect to the home page if already authenticated
      }
    }, [isAuthenticated, navigate]);
  
    return (
      <div className="register-root">
        <Header section={'Registrarse'}/>
        <div className="register-container">
          <form id="form" className="form-register" onSubmit={handleSubmit}>
            <h2 className="register-container_form-h2">Registro</h2>
            <div className="register-inputs-container">
              {inputs.map((input) => (
                <FormInput
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
                />
              ))}
            </div>
            <span className="spans" style={showSpanAlreadyExistsUser ? { display: "block" } : { display: "none" }}
              >
                {userValueError}
            </span>
            <div className="div-buttons">
              <input
                  className="register-button"
                  type="submit"
                  value="Registrarse"
                  id="register-button"
                />
            </div>
            <Link className="register-container__form-a" to={"/login"}>
              <div>
                ¿Ya tienes una cuenta?
              </div>
            </Link>
          </form>
        </div>
        <Footer />
      </div>
    );
  };
  
  export default RegisterForm;