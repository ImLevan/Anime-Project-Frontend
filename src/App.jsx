import { Suspense } from "react";
import { Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import RoutesWithNotFound from "./utilities/RoutesWithNotFound";
import { PrivateRoutes, PublicRoutes } from "./Routes/routes";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import RegisterForm from "./pages/Register/RegisterForm";
import ProtectedToken from "./components/ProtectedToken";
import AuthToken from "./pages/AuthToken/AuthToken";
import Landing from "./pages/Landing/Landing";

function App() {

  return (
    <Suspense fallback={<>Cargando</>}>
      <RoutesWithNotFound>
        <Route path="/" element={<Navigate to={PublicRoutes.LANDING} replace />} />
        <Route path={PublicRoutes.LOGIN} element={<Login />}/>
        <Route path={PublicRoutes.REGISTER} element={<RegisterForm />}/>
        <Route path={PublicRoutes.LANDING} element={<Landing />}/>
        <Route 
          path={PrivateRoutes.HOME} 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route 
          path={PrivateRoutes.AUTH + "/:userID"} 
          element={
            <ProtectedToken>
              <AuthToken />
            </ProtectedToken>
          } 
        />
      </RoutesWithNotFound>
    </Suspense>
  );
}

export default App;
