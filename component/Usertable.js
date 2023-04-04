import User from "./User"

function Usertable({users, handleDelete, setEditUser}) {

	const userGenerator = () => {
		return (
			<>
				{
					users.map(user => {
						return (
							<User
								key={user}
								user={user}
								handleDelete={handleDelete}
								setEditUser={setEditUser}
							/>
						)
					})
				}
			</>
		)
	}

    return (
        <>
            <table className="table table-striped table-hover">
				<thead>
					<tr>
						<th>
							<span className="custom-checkbox">
								<input type="checkbox" id="selectAll" />
								<label htmlFor="selectAll"></label>
							</span>
						</th>
						<th>Name</th>
						<th>Email</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{userGenerator()}
				</tbody>
			</table>
        </>
    )
}

export default Usertable