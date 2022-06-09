import React, { useEffect, useState } from "react";
import Data from "./Data";

const DataTable = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [searchedUsers, setSearchedUsers] = useState([]);

    useEffect(() => {
        fetch(
            "https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json"
        )
            .then((res) => res.json())
            .then((data) => {
                setAllUsers(data);
                setSearchedUsers(data.slice(0, 10));
            });
    }, []);
    return (
        <div className="mt-4">
            <h2 className="text-3xl text-blue-500 text-center mb-5">Data Table</h2>
            <div>
                <div class="overflow-x-auto">
                    <table class="table w-full">
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
            </div>
        </div>
    );
};

export default DataTable;
