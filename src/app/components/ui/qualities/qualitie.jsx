import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const Qualitie = ({ id }) => {
    const { getQuality } = useQualities();
    const { color, name } = getQuality(id);
    return <div className={`badge bg-${color} m-1`}>{name}</div>;
};
Qualitie.propTypes = {
    id: PropTypes.string.isRequired
};

export default Qualitie;
