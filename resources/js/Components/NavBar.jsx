import React, { useState } from "react";
import NavLink from "@/Components/NavLink";
import SearchButton from "@/Components/SearchButton";
import Dropdown from "@/Components/Dropdown";
import Modal from "@/Components/Modal";
import SearchBar from "@/Components/SearchBar";
import SecondaryButton from "@/Components/SecondaryButton";
import {
    IoHome,
    IoFileTrayFull,
    IoPerson,
    IoMail,
    IoInformationCircle,
} from "react-icons/io5";

export default function NavBar() {
    const [searching, setSearching] = useState(false);

    const toggleModal = () => {
        setSearching(!searching);
    };

    return (
        <nav className="px-2 pt-4 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
            <div className="container flex items-center justify-between mx-auto ">
                <a href="#" className="flex items-center">
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                        School Helper
                    </span>
                </a>
                <button
                    data-collapse-toggle="navbar-dropdown"
                    type="button"
                    className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-dropdown"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </button>
                <div
                    className="hidden w-full md:block md:w-auto "
                    id="navbar-dropdown"
                >
                    <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
                        <NavLink
                            href={route("home")}
                            active={route().current("home")}
                        >
                            <IoHome className="mr-2" />
                            Home
                        </NavLink>
                        <NavLink
                            href={route("courses")}
                            active={route().current("courses")}
                        >
                            <IoFileTrayFull className="mr-2" />
                            Courses
                        </NavLink>

                        <NavLink
                            href={route("about")}
                            active={route().current("about")}
                        >
                            <IoInformationCircle className="mr-2" />
                            About
                        </NavLink>
                        <NavLink
                            href={route("contact")}
                            active={route().current("contact")}
                        >
                            <IoMail className="mr-2" />
                            Contact
                        </NavLink>
                        <button type="button" onClick={toggleModal}>
                            <SearchButton />
                        </button>

                        <div className="hidden sm:flex sm:items-center">
                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button
                                            type="button"
                                            className="inline-flex items-center border border-transparent text-sm font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                        >
                                            <IoPerson className="mr-2" />
                                            Profile
                                            <svg
                                                className="ml-2 -mr-0.5 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            My Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("dashboard")}
                                        >
                                            My Dashboard
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
            <Modal show={searching}>
                <div className="flex justify-between">
                    <SearchBar />
                    <SecondaryButton
                        onClick={toggleModal}
                        className="bg-indigo-500 text-white hover:text-black"
                    >
                        Cancel
                    </SecondaryButton>
                </div>
            </Modal>
        </nav>
    );
}
