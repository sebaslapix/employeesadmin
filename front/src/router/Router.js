import { BrowserRouter, Route, Routes } from "react-router-dom";
import Employee from "../pages/Employee";
import RequestE from "../pages/RequestE";
import Login from "../pages/Login";
import Private from "../helper/Private";
import Public from "../helper/Public";
import NotFound from "../pages/NotFound";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Private />}>
                    <Route index element={<Employee />} />
                    <Route path="/employee" element={<Employee />} />
                    <Route path="/request" element={<RequestE />} />
                </Route>
                <Route path="/login" element={<Public />}>
                    <Route index element={<Login />} />
                </Route>
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;