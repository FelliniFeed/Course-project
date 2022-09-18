import React, {useState} from "react";
import api from  '../api';

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    
    const handleDelete = (userId) => setUsers(prevState => prevState.filter(user => user._id !== userId));
    
    const renderPhrase = (number) => {
       return  number !== 0 && number !== 2 && number !== 3 && number !== 4 ? <h1 className="badge bg-primary fs-3">{`${number} человек с тобой тусанет`}</h1> :
        (number === 2 || number === 3 || number === 4) ? <h1 className="badge bg-primary fs-3">{`${number} человека с тобой тусанет`}</h1> :
        <h1 className="badge bg-danger fs-3">Никто с тобой не тусанет</h1>
    };
    
    return users.length > 0 ? (

        <>

       {renderPhrase(users.length) }

        <table className="table">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Качества</th>
            <th>Профессия</th>
            <th>Встретился, раз</th>
            <th>Оценка</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            {users.map((user) => (
                <tr key={user._id}>
                    <td>{user.name}</td>
                    <td> 
                        {user.qualities.map((quality) => (
                        <div key={quality._id} className={`badge bg-${quality.color} m-1`}>{quality.name}</div>
                        ))}
                    </td>
                    <td>
                        {user.profession.name}
                    </td>
                    <td> {user.completedMeetings}</td>
                    <td>{user.rate}/5</td>
                    <td>
                        <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
      </>
    ) : renderPhrase(users.length) 
    }
export default Users;