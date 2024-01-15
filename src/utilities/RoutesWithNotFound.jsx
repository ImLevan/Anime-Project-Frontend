import { Route, Routes } from "react-router-dom";
import NotFound from "../pages/NotFound/NotFound";

// eslint-disable-next-line react/prop-types
function RoutesWithNotFound({children}){
    return (
        <Routes>
            {children}
            <Route path="*" element={<NotFound/>} />
        </Routes>
    )
}

export default RoutesWithNotFound;