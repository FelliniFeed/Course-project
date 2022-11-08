import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";
import GroupList from "./groupList";
import PropTypes from "prop-types";
import api from "../api";
import SearchStatuis from "./searchStatus";

const Users = ({ users: allUsers, ...rest }) => {
    const pageSize = 4;

    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const filteredUsers = selectedProf ? allUsers.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf)) : allUsers;
    const count = filteredUsers.length;
    const userCrop = paginate(filteredUsers, currentPage, pageSize);
    const clearFilter = () => {
        setSelectedProf();
    };
    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem = {selectedProf}
                        items = {professions}
                        onItemSelect = {handleProfessionSelect}
                    />
                    <button className="btn btn-secondary mt-2" onClick={clearFilter}>Очистить</button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatuis length={count} />
                {count > 0 && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Имя</th>
                                <th>Качества</th>
                                <th>Профессия</th>
                                <th>Встретился, раз</th>
                                <th>Оценка</th>
                                <th>Избранное</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {userCrop.map((user) => (
                                <User key={user._id} {...user} {...rest} />
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};
export default Users;

Users.propTypes = {
    users: PropTypes.array.isRequired
};
