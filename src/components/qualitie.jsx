import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ color, name }) => {
    return <div className={`badge bg-${color} m-1`}>{name}</div>;
};

export default Qualitie;

Qualitie.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};
