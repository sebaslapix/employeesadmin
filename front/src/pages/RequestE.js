import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Request from "../helper/Request";
import useAuth from "../hooks/useAuth";
import FormValidation from "../helper/FormValidation";
import useForm from "../hooks/useForm";

const RequestE = () => {
    const { employee } = useAuth();
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState('');
    const { form, change } = useForm();

    const loadRequests = async () => {
        const response = await Request(`${process.env.REACT_APP_API_URL}request/list`, 'GET');
        if (response.status === 'success') {
            setRequests(response.requests);
        }
    }
    useEffect(() => {
        loadRequests();
    }, [])

    const requestRegister = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token')
        const validacion = FormValidation(e.target);
        if (validacion) {
            const response = await Request(`${process.env.REACT_APP_API_URL}request/create/${employee.id}`, 'POST', form, JSON.parse(token));
            if (response.status === 'success') {
                loadRequests()
            }
            else {
                setError('Error found during inserting new register ')
            }
        }
    }

    const deleteRequest = async (id) => {
        const token = localStorage.getItem('token')
        const response = await Request(`${process.env.REACT_APP_API_URL}request/delete/${id}`, 'DELETE', {}, JSON.parse(token));
        if (response.status === 'success') {
            loadRequests()
        }
        else {
            setError('Error found during inserting new register ')
        }
    }

    const handleSearch = async ({target}) => {
        if(target.value.toString().trim() !== ""){
            const response = await Request(`${process.env.REACT_APP_API_URL}request/search/${target.value}`, 'GET', {}, '');
            if (response.status === 'success') {
                setRequests(response.request)
            }
            else {
                setError('Error found during inserting new register ')
            }
        }
    }

    const handlePagination = async ({target}) => {
        const response = await Request(`${process.env.REACT_APP_API_URL}request/list/${target.value}`, 'GET');
        if (response.status === 'success') {
            setRequests(response.requests);
        }
    }

    return (
        <>
            <NavBar />
            <section className="container py-5">
                <h1> List of Requests </h1>
                {employee.role === 'admin' && (<button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createEmployee"> New </button>)}
                <p> {error} </p>
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
                            <th scope="col">Code</th>
                            <th scope="col">Description</th>
                            <th scope="col">Summary</th>
                            <th scope="col">User</th>
                            {employee.role === 'admin' && <th scope="col">Actions</th> }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            requests.map((request, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{request.code}</td>
                                    <td>{request.description}</td>
                                    <td>{request.summary}</td>
                                    <td>{request.Employee.username}</td>
                                    {employee.role === 'admin' && <td style={{ cursor: 'pointer' }} onClick={() => deleteRequest(request.id)}> Delete </td>}
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
                            <h5 className="modal-title" id="exampleModalLabel">Create new Request</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="row g-3" onSubmit={requestRegister}>
                                <div className="col-md-6">
                                    <label htmlFor="code" className="form-label">Code</label>
                                    <input type="texy" className="form-control" id="code" name="code" onChange={change} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" name="description" onChange={change} />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="summary" className="form-label">Summary</label>
                                    <input type="text" className="form-control" id="summary" name="summary" placeholder="Summary" onChange={change} />
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

export default RequestE;