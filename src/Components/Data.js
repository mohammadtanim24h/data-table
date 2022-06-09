import React from "react";

const Data = ({ userData }) => {
    const { first_name, last_name, age, city, company_name } = userData;
    return (
        <tr>
            <td>{first_name}</td>
            <td>{last_name}</td>
            <td>{city}</td>
            <td>{age}</td>
            <td>{company_name}</td>
        </tr>
    );
};

export default Data;
