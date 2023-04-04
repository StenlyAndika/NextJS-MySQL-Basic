function User({user, handleDelete, setEditUser}) {

    const fetchUser = async (userId) => {
        const response = await fetch("http://localhost:3000/api/controllers/"+userId);
        const result = await response.json();

        setEditUser(result);
    }
    return (
        <>
            <tr>
                <td>
                    <span className="custom-checkbox">
                        <input type="checkbox" id="data_checkbox" className="data_checkbox" name="data_checkbox" value="" />
                        <label htmlFor="data_checkbox"></label>
                    </span>
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                    <a href="#editEmployeeModal" onClick={() => fetchUser(user.id)} className="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                    <a href="#deleteEmployeeModal" onClick={() => handleDelete(user.id)} className="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                </td>
            </tr>
        </>
    )
}

export default User;