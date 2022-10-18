import React, {useState} from "react";
import Users from "./users";
import SearchStatuis from "./searchStatus";
import api from  '../api';

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDelete = (userId) => setUsers(users.filter(user => user._id !== userId));

    const handleToggleBookmark = (id) => {
        setUsers(users.map( user => {
            if (user._id === id) {
                return {...user, bookmark: !user.bookmark}
            }
            return user;
        }))
    }
    return (
        <div>
            <SearchStatuis length={users.length}/>
            {users && (
                <Users users={users} onDelete={handleDelete} onToggleBookmark={handleToggleBookmark}/>
            )}
        </div>
    )
}

export default App;