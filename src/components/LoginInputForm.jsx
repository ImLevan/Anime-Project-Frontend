/* eslint-disable react/prop-types */


function LoginInputForm({ usernameState, setUsernameState, passwordState, setPasswordState, setShowSpanPasswordOrUser }) {
  const handleUsernameChange = (e) => {
    setUsernameState(e.target.value);
    setShowSpanPasswordOrUser(false);
  };

  const handlePasswordChange = (e) => {
    setPasswordState(e.target.value);
    setShowSpanPasswordOrUser(false);
  };

  const handleKeyPress = (e) => {
    const pattern = /^[a-zA-Z0-9]+$/;
    if (!pattern.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="inputs-container">
      <div className="input-contain">
        <label className="placeholder-text">
            <div className="text">Usuario</div>
        </label>
        <input
          type="text"
          id="username"
          value={usernameState}
          onChange={handleUsernameChange}
          onKeyPress={handleKeyPress}
          required
        />
      </div>
      <div className="input-contain">
        <label className="placeholder-text">
            <div className="text">Contraseña</div>
        </label>
        <input
          type="password"
          id="password"
          value={passwordState}
          onChange={handlePasswordChange}
          required
        />
      </div>
    </div>
  );
}

export default LoginInputForm;