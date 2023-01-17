import { useEffect, useState } from "react";
import NavLink from "@/Components/NavLink";
import SearchButton from "@/Components/SearchButton";
import Dropdown from "@/Components/Dropdown";
import Modal from "@/Components/Modal";
import SearchBar from "@/Components/SearchBar";
import SecondaryButton from "@/Components/SecondaryButton";
import {
    IoFileTrayFull,
    IoHome,
    IoInformationCircle,
    IoMail,
    IoPerson,
} from "react-icons/io5";

export default function NavBar() {
    const [searching, setSearching] = useState(false);
    const [navbar, setNavbar] = useState(false);
    // fake log auth
    const [isAuth, setIsAuth] = useState(false);

    const toggleModal = () => {
        setSearching(!searching);
    };
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const handleScroll = () => {
        const currentScrollPos = window.scrollY;

        if (currentScrollPos > prevScrollPos) {
            setVisible(false);
        } else {
            setVisible(true);
        }

        setPrevScrollPos(currentScrollPos);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    });

    return (
        <nav
            className={`w-full bg-white shadow sticky duration-500 z-50  ${
                visible
                    ? "top-0 md:translate-y-0"
                    : "top-0 md:translate-y-[-100px]"
            }`}
        >
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <a href="#" className="flex items-center">
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                                School Helper
                            </span>
                        </a>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-center pb-3 mt-2 md:block md:pb-0 md:mt-0  ${
                            navbar ? "flex" : "hidden"
                        }`}
                    >
                        <ul className="flex flex-col md:flex-row space-y-8 md:space-x-6 md:space-y-0">
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
                            <div className="w-50% h-px md:h-7 md:w-px bg-gray-200"></div>

                            <button type="button" onClick={toggleModal}>
                                <SearchButton />
                            </button>
                            <div className="w-50% h-px md:h-7 md:w-px bg-gray-200"></div>

                            <div className="sm:flex sm:items-center">
                                <div className="relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <button
                                                type="button"
                                                className="inline-flex items-center border border-transparent text-lg md:text-sm font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
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

                                        <div
                                            className={`${
                                                isAuth ? "flex" : "hidden"
                                            }`}
                                        >
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
                                        </div>
                                        <div
                                            className={`${
                                                isAuth ? "hidden" : "flex"
                                            }`}
                                        >
                                            <Dropdown.Content>
                                                <Dropdown.Link
                                                    href={route("login")}
                                                >
                                                    Login
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route("register")}
                                                >
                                                    Register
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </div>
                                    </Dropdown>
                                </div>
                            </div>
                        </ul>
                    </div>
                </div>
                <Modal show={searching}>
                    <SearchBar />
                </Modal>
            </div>
        </nav>
    );
}
