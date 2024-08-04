import { createContext, useEffect, useState } from "react"
import Request from "../helper/Request";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [ employee, setEmployee ] = useState();

    useEffect(() => {
        const loadEmployeeFromLocalStorage = () => {
            const savedEmployee = localStorage.getItem('employee');
            if (savedEmployee) {
                setEmployee(JSON.parse(savedEmployee));
            }
        };

        loadEmployeeFromLocalStorage();
    }, []);

    const login = async (data) => {
        const response = await Request(`${process.env.REACT_APP_API_URL}employee/login`, 'POST', data);
        const token = response.token;
        if(token){
            setEmployee(response.payload);
            localStorage.setItem('token', JSON.stringify(token));
            localStorage.setItem('employee', JSON.stringify(response.payload));
        }
        return response;
    }

    const logout = () => {
        setEmployee(null);
        localStorage.removeItem('token');
    };

    return(
        <AuthContext.Provider value={{employee, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthContext,
    AuthProvider
}