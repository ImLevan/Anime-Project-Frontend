export const persistSession = (username, password, cookie, id) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7); // Set the expiration to 7 days from now

    cookie.set("user", { username, password, id }, { expires: expirationDate });
  };
  
  export const clearSession = (setUsername, setPassword, setIsAuthenticated, cookie) => {
    setUsername("");
    setPassword("");
    setIsAuthenticated(false);
    cookie.remove("user");
  };