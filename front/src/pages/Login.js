import { useNavigate } from "react-router-dom";
import FormValidation from "../helper/FormValidation";
import useAuth from "../hooks/useAuth";
import useForm from "../hooks/useForm";
import { useState } from "react";

const Login = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { form, change } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();

    const userlogin = async (e) => {
        setLoading(true);
        e.preventDefault();
        const validacion = FormValidation(e.target);
        if (validacion) {
            const response = await login(form);
            setLoading(false)
            if (response.status === 'success') {
                navigate("/")
            }
            setError("Check the data")
        }
    }

    return (
        <>
            {
                loading
                ?
                (
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                )
                :
                (
                    <form className="w-50 mx-auto py-5 px-5 shadow-lg mt-5" onSubmit={userlogin}>
                        {
                            error
                        }
                        <h1 className="text-center mb-3"> Sign In </h1>
                        <div className="row mb-3">
                            <label htmlFor="inputUser" className="col-sm-2 col-form-label">Username</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="inputUser" name="username" onChange={change} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="inputPassword" name="password" onChange={change} />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Sign in</button>
                    </form>
                )
            }
        </>
    )
}

export default Login;