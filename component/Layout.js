import { useContext, useState } from "react"
import Alert from "./Alert"
import Navbar from "./Navbar"
import Pagination from "./Pagination"
import Usertable from "./Usertable"
import AppContext from "@/context/appContext"
import { Paginate } from "@/helper/paginate"
import { Search } from "@/helper/search"

function Layout() {

    const value = useContext(AppContext)

    const [alertMsg, setAlertMsg] = useState("");
    const [saveUser, setSaveUser] = useState({
        username: "",
        email: ""
    })
    const [editUser, setEditUser] = useState({
        id: "",
        username: "",
        email: ""
    })
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3;
    const onPageChange = (page) => {
        setCurrentPage(page);
    }
    let paginatedUsers
    let searchResult;
    if(searchQuery.length > 0) {
        searchResult = Search(value.users, searchQuery);
        paginatedUsers = Paginate(searchResult, currentPage, pageSize);
    } else {
        paginatedUsers = Paginate(value.users, currentPage, pageSize);
    }
    const handleSaveChange = ({target : {name, value}}) => {
        setSaveUser({...saveUser, [name] : value});
    }
    const handleAddSubmit = async (e) => {
        e.preventDefault();

        const req = {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(saveUser)
        }

        const response = await fetch("http://localhost:3000/api/controllers", req);
        const result = await response.json();

        setSaveUser({
            username: "",
            email: ""
        })

        if(result) {
            setAlertMsg("User added successfully");
            document.getElementsByClassName("addCancel")[0].click();
            const prevUsers = value.users;
            prevUsers.push(result);
            value.setMyUsers(prevUsers);
        }
    }

    const handleDelete = async (userId) => {
        const req = {
            method: "DELETE"
        }

        const response = await fetch("http://localhost:3000/api/controllers/"+userId, req);
        const result = await response.json();

        if(result) {
            setAlertMsg("User deleted successfully");
            const prevUsers = value.users;
            const newUsers = prevUsers.filter(user => {
                return user.id != userId;
            })
            prevUsers.push(result);
            value.setMyUsers(newUsers);
        }
    }

    const handleEditChange = ({target: {name, value}}) => {
        setEditUser({...editUser, [name] : value});
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const req = {
            method: "PUT",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(editUser)
        }

        const response = await fetch("http://localhost:3000/api/controllers/"+editUser.id, req);
        const result = await response.json();

        if(result) {
            setAlertMsg("User updated successfully");
            document.getElementsByClassName("editCancel")[0].click();
            const prevUsers = value.users.filter(user => {
                return user.id != editUser.id;
            });
            prevUsers.push(result);
            value.setMyUsers(prevUsers);
        }
    }
    return (
        <>
            <div id="addEmployeeModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={handleAddSubmit}>
                            <div className="modal-header">						
                                <h4 className="modal-title">Add Employee</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            </div>
                            <div className="modal-body">					
                                <div className="form-group">
                                    <label>Name</label>
                                    <input value = {saveUser.username} onChange = {handleSaveChange} type="text" className="form-control" name="username" required />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input value = {saveUser.email} onChange = {handleSaveChange} type="email" className="form-control" name="email" required />
                                </div>				
                            </div>
                            <div className="modal-footer">
                                <input type="button" className="btn btn-default addCancel" name="submit" data-dismiss="modal" value="Cancel" />
                                <input type="submit" className="btn btn-success" value="Add" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div id="editEmployeeModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={handleEditSubmit}>
                            <div className="modal-header">						
                                <h4 className="modal-title">Edit Employee</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Username</label>
                                    <input type="text" value={editUser.username} onChange={handleEditChange} className="form-control" name = "username" required />
                                </div>
                                <div className="form-group">
                                    <label>email</label>
                                    <input type="text" value={editUser.email} onChange={handleEditChange} className="form-control" name = "email"  required />
                                </div>			
                            </div>
                            <div className="modal-footer">
                                <input type="button" name = "submit" className="btn btn-default editCancel" data-dismiss="modal" value="Cancel" />
                                <input type="submit" className="btn btn-info" value="Save" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="container-xl">
                <div className="table-responsive d-flex flex-column">
                    <Alert text={alertMsg} setAlertMsg={setAlertMsg} style={alertMsg.length > 0 ? 'block' : ''} />
                    <div className="table-wrapper">
                        <Navbar
                            searchQuery = {searchQuery}
                            setSearchQuery = {setSearchQuery}
                        />
                        <Usertable
                            setEditUser = {setEditUser}
                            users = {paginatedUsers}
                            handleDelete = {handleDelete}
                        />
                        <Pagination
                            usersCount = {searchQuery.length > 0 ? searchQuery.length : value.users.length}
                            currentPage = {currentPage}
                            pageSize = {pageSize}
                            onPageChange = {onPageChange}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout