import React, { useEffect, useState } from "react";
import Data from "./Data";
import { HiSortAscending } from "react-icons/hi";
import { HiSortDescending } from "react-icons/hi";

const DataTable = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [selectedPage, setSelectedPage] = useState(0);
    const [reservedUsers, setReservedUsers] = useState([]);

    useEffect(() => {
        fetch(
            "https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json"
        )
            .then((res) => res.json())
            .then((data) => {
                const firstHundred = data.slice(0, 100);
                setAllUsers(firstHundred);
                setSearchedUsers(firstHundred.slice(0, 10));
                setPageCount(firstHundred.length / 10);
                setReservedUsers(firstHundred);
            });
    }, []);

    const handleSearchUser = (e) => {
        const searchText = e.target.value.toLowerCase();
        const filteredUsers = reservedUsers.filter(
            (user) =>
                user.first_name.toLowerCase().includes(searchText) ||
                user.last_name.toLowerCase().includes(searchText)
        );

        if (searchText === "") {
            setSearchedUsers(reservedUsers.slice(0, 10));
            setPageCount(10);
            setSelectedPage(0);
            setAllUsers(reservedUsers);
        } else {
            setSearchedUsers(filteredUsers.slice(0, 10));
            setPageCount(Math.ceil(filteredUsers.length / 10));
            setAllUsers(filteredUsers);
            setSelectedPage(0);
        }
    };

    const showUsers = (number) => {
        setSelectedPage(number);
        const filteredUsers = allUsers.slice(number * 10, number * 10 + 10);
        setSearchedUsers(filteredUsers);
    };

    const sortFirstNameInAscending = () => {
        const sortedUsers = allUsers.sort(function (a, b) {
            if (a.first_name < b.first_name) {
                return -1;
            }
            if (b.first_name < a.first_name) {
                return 1;
            }
            return 0;
        });
        setSearchedUsers(sortedUsers.slice(0, 10));
        setAllUsers(sortedUsers);
        setSelectedPage(0);
    };

    const sortFirstNameInDescending = () => {
        const sortedUsers = allUsers.sort(function (a, b) {
            if (a.first_name > b.first_name) {
                return -1;
            }
            if (b.first_name > a.first_name) {
                return 1;
            }
            return 0;
        });
        setSearchedUsers(sortedUsers.slice(0, 10));
        setAllUsers(sortedUsers);
        setSelectedPage(0);
    };

    const sortLastNameInAscending = () => {
        const sortedUsers = allUsers.sort(function (a, b) {
            if (a.last_name < b.last_name) {
                return -1;
            }
            if (b.last_name < a.last_name) {
                return 1;
            }
            return 0;
        });
        setSearchedUsers(sortedUsers.slice(0, 10));
        setAllUsers(sortedUsers);
        setSelectedPage(0);
    };

    const sortLastNameInDescending = () => {
        const sortedUsers = allUsers.sort(function (a, b) {
            if (a.last_name > b.last_name) {
                return -1;
            }
            if (b.last_name > a.last_name) {
                return 1;
            }
            return 0;
        });
        setSearchedUsers(sortedUsers.slice(0, 10));
        setAllUsers(sortedUsers);
        setSelectedPage(0);
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
                {searchedUsers.length === 0 ? (
                    <p className="mt-3 text-xl text-center text-red-500 mb-4">
                        No matching records found
                    </p>
                ) : (
                    ""
                )}
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th className="text-sm">
                                    First Name{" "}
                                    <HiSortAscending
                                        onClick={sortFirstNameInAscending}
                                        title="Ascending Order"
                                        className="inline text-base cursor-pointer mx-1"
                                    ></HiSortAscending>
                                    <HiSortDescending
                                        onClick={sortFirstNameInDescending}
                                        title="Descending Order"
                                        className="inline text-base cursor-pointer"
                                    ></HiSortDescending>
                                </th>
                                <th className="text-sm">
                                    Last Name
                                    <HiSortAscending
                                        onClick={sortLastNameInAscending}
                                        title="Ascending Order"
                                        className="inline text-base cursor-pointer mx-1"
                                    ></HiSortAscending>
                                    <HiSortDescending
                                        onClick={sortLastNameInDescending}
                                        title="Descending Order"
                                        className="inline text-base cursor-pointer"
                                    ></HiSortDescending>
                                </th>
                                <th className="text-sm">
                                    City{" "}
                                    <HiSortAscending
                                        title="Ascending Order"
                                        className="inline text-base cursor-pointer mx-1"
                                    ></HiSortAscending>
                                    <HiSortDescending
                                        title="Descending Order"
                                        className="inline text-base cursor-pointer"
                                    ></HiSortDescending>
                                </th>
                                <th className="text-sm">
                                    Age{" "}
                                    <HiSortAscending
                                        title="Ascending Order"
                                        className="inline text-base cursor-pointer mx-1"
                                    ></HiSortAscending>
                                    <HiSortDescending
                                        title="Descending Order"
                                        className="inline text-base cursor-pointer"
                                    ></HiSortDescending>
                                </th>
                                <th className="text-sm">
                                    Company Name{" "}
                                    <HiSortAscending
                                        title="Ascending Order"
                                        className="inline text-base cursor-pointer mx-1"
                                    ></HiSortAscending>
                                    <HiSortDescending
                                        title="Descending Order"
                                        className="inline text-base cursor-pointer"
                                    ></HiSortDescending>
                                </th>
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
                            onClick={() => showUsers(number)}
                            className={`btn btn-sm border border-primary bg-base-100 hover:border-primary text-primary hover:bg-primary hover:text-white font-bold m-1 rounded-md ${
                                selectedPage === number
                                    ? "bg-primary text-white"
                                    : ""
                            }`}
                            key={index}
                        >
                            {number + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DataTable;
