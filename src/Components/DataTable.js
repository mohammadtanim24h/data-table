import React, { useEffect, useRef, useState } from "react";
import Data from "./Data";

const DataTable = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        fetch(
            "https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json"
        )
            .then((res) => res.json())
            .then((data) => {
                const firstHundred = data.slice(0, 100);
                setAllUsers(firstHundred);
                setSearchedUsers(firstHundred);
                setPageCount(firstHundred.length / 10);
            });
    }, []);

    const handleSearchUser = (e) => {
        const searchText = e.target.value.toLowerCase();
        const filteredUsers = allUsers.filter(
            (user) =>
                user.first_name.toLowerCase().includes(searchText) ||
                user.last_name.toLowerCase().includes(searchText)
        );
        setSearchedUsers(filteredUsers);
    };

    return (
        <div className="mt-4">
            <h2 className="text-3xl font-semibold text-primary mb-5">
                Data Table
            </h2>
            <span className="text-xl font-semibold">Search: </span>
            <input
                onChange={handleSearchUser}
                className="input input-bordered w-full max-w-xs"
                type="text"
                placeholder="Search by first or last name"
            />
            <div className="mt-5">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th className="text-sm">First Name</th>
                                <th className="text-sm">Last Name</th>
                                <th className="text-sm">City</th>
                                <th className="text-sm">Age</th>
                                <th className="text-sm">Company Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchedUsers.map((userData) => (
                                <Data
                                    key={userData.id}
                                    userData={userData}
                                ></Data>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="text-center mt-5">
                    {[...Array(pageCount).keys()].map((number, index) => (
                        <button
                            className="btn btn-sm border border-primary bg-base-100 hover:border-primary text-primary hover:bg-primary hover:text-white font-bold m-1 rounded-md"
                            key={index}
                        >
                            {number}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DataTable;
