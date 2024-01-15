import { useContext, useState } from "react";
import FormInput from "../../components/FormInput";
import { inputToken } from "../Register/registerInputs";
import { UserContext } from "../../context/UsersContext";
import { useParams } from "react-router-dom";
import "./AuthToken.css";



const AuthToken = () => {

    const { userID } = useParams();

    const [userCode, setUserCode] = useState({
        id: userID,
        code: ""
      });

    const { showSpanErrorCode, userCodeError, setSpanErrorCode, sendCode } = useContext(UserContext);

    const onChange = (e) => {
        setUserCode({ ...userCode, [e.target.name]: e.target.value });
        setSpanErrorCode(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendCode(userCode);
    };

    return (
        <div className="auth-container">
            <form id="form" className="form" onSubmit={handleSubmit}>
                <h2 className="auth_form-h2">Código de autenticación</h2>
                <p className="auth_form-p">Ingrese el código de autenticación que le enviamos a su mail para poder acceder a tu cuenta.</p>
                <FormInput
                    key={inputToken.id}
                    {...inputToken}
                    value={userCode[inputToken.name]}
                    onChange={onChange}
                />
                <span className="spans" style={showSpanErrorCode ? { display: "block" } : { display: "none" }}
                >
                {userCodeError}
                </span>
                <div className="div-buttons">
                    <input
                        className="auth-button"
                        type="submit"
                        value="Enviar código"
                        id="auth-button"
                    />
                </div>
            </form>
        </div>
    );
};

export default AuthToken;