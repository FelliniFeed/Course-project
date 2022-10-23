import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";
import PropTypes from "prop-types";

const User = ({
    name,
    _id,
    bookmark,
    profession,
    completedMeetings,
    qualities,
    rate,
    onToggleBookmark,
    onDelete
}) => {
    return (
        <>
            <tr>
                <td>{name}</td>
                <td>
                    {qualities.map((qualitie) => (
                        <Qualitie key={qualitie._id} {...qualitie} />
                    ))}
                </td>
                <td>{profession.name}</td>
                <td>{completedMeetings}</td>
                <td>{rate}/5</td>
                <td>
                    <BookMark
                        onClick={() => onToggleBookmark(_id)}
                        status={bookmark}
                    />
                </td>
                <td>
                    <button
                        className="btn btn-danger"
                        onClick={() => onDelete(_id)}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        </>
    );
};

export default User;

User.propTypes = {
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    bookmark: PropTypes.bool.isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    qualities: PropTypes.array.isRequired,
    rate: PropTypes.number.isRequired,
    onToggleBookmark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};
