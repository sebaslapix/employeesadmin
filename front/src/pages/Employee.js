import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Request from "../helper/Request";
import useAuth from "../hooks/useAuth";
import FormValidation from "../helper/FormValidation";
import useForm from "../hooks/useForm";

const Employee = () => {
    const { employee } = useAuth();
    const [ employees, setEmployees ] = useState([]);
    const [error, setError] = useState('');
    const { form, change } = useForm();

    const loadEmployees = async () => {
        const response = await Request(`${process.env.REACT_APP_API_URL}employee/list`, 'GET');
        if (response.status === 'success') {
            setEmployees(response.employees);
        }
    }
    useEffect(() => {
        loadEmployees();
    }, [])

    const employeeRegister = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token')
        const validacion = FormValidation(e.target);
        if (validacion) {
            const response = await Request(`${process.env.REACT_APP_API_URL}employee/create`, 'POST', form, JSON.parse(token));
            if(response.status==='success'){
                loadEmployees()
            }
            else{
                setError('Error found during inserting new register ')
            }
        }
    }

    const handleSearch = async ({target}) => {
        if(target.value.toString().trim() !== ""){
            const response = await Request(`${process.env.REACT_APP_API_URL}employee/search/${target.value}`, 'GET', {}, '');
            if (response.status === 'success') {
                setEmployees(response.employees)
            }
            else {
                setError('Error found during inserting new register ')
            }
        }
    }

    const handlePagination = async ({target}) => {
        const response = await Request(`${process.env.REACT_APP_API_URL}employee/list/${target.value}`, 'GET');
        if (response.status === 'success') {
            setEmployees(response.employees);
        }
    }

    return (
        <>
            <NavBar />
            <section className="container py-5">
                <h1> List of Employee </h1>
                {employee.role === 'admin' && (<button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createEmployee"> New </button>)}
                <p> { error } </p>
                <div className="form-floating mb-3 d-flex gap-5">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Search..." onChange={handleSearch}/>
                    <label htmlFor="floatingInput">Search</label>
                    <div className="form-floating">
                        <select className="form-select" id="floatingSelect" aria-label="Floating label select example" onChange={handlePagination}>
                            <option defaultValue=''>Page</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        <label htmlFor="floatingSelect">Pages</label>
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Username</th>
                            <th scope="col">Role</th>
                            <th scope="col">Start Date</th>
                            <th scope="col">Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map((employee, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{employee.name}</td>
                                    <td>{employee.username}</td>
                                    <td>{employee.role}</td>
                                    <td>{employee.startDate.split('T')[0]}</td>
                                    <td>{employee.salary}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </section>
            <div className="modal fade" id="createEmployee" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Create new Employee</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="row g-3" onSubmit={employeeRegister}>
                                <div className="col-md-6">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="texy" className="form-control" id="username" name="username" onChange={change} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="inputPassword4" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="inputPassword4" name="password" onChange={change} />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" name="name" placeholder="Name" onChange={change} />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="salary" className="form-label">Salary</label>
                                    <input type="text" className="form-control" id="salary" placeholder="$000" name="salary" onChange={change} />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="role" className="form-label">Role</label>
                                    <select id="role" className="form-select" name="role" onChange={change}>
                                        <option defaultValue=''></option>
                                        <option value='admin'>Admin</option>
                                        <option value='employee'>Employee</option>
                                    </select>
                                </div>
                                <div className="col-12">
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Create</button>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Employee;