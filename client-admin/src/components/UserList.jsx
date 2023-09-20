import { useState, useEffect } from "react";
import axios from "axios";
import UserRow from "./UserRow";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users with details and available batches when the component mounts
    axios.get("http://localhost:3000/admin/users").then((response) => {
      setUsers(response.data.users);
    });
  }, []);

  return (
    <div>
      <h2>User List</h2>

      <div className="user-list">
        {users.map((user) => (
          <UserRow key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default UserList;
