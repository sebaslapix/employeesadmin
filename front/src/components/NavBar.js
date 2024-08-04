import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const NavBar = () => {
    const { employee, logout } = useAuth();
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink className="nav-link" to="/employee">Employee</NavLink>
                        <NavLink className="nav-link" to="/request">Request</NavLink>
                    </div>
                </div>
                <div className="gap-2">
                    <h1 className="text-white fs-6"> { employee.role } </h1>
                    <button className="btn btn-danger" onClick={()=>logout()}> Log out </button>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;