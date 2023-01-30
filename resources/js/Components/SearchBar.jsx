import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function SearchBar({ toggleModal }) {
    const [querry, setQuery] = useState("");

    const handleOnSubmit = (e) => {
        e.preventDefault();
        router.get(`/search?${querry}`);
        toggleModal();
    };

    return (
        <div className="block">
            <div className="absolute top-4 left-1 flex items-center pl-3 pointer-events-none">
                {/* remplace with react icon */}
                <svg
                    className="w-5 h-5 text-gray-500"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                    ></path>
                </svg>
                <span className="sr-only">Search icon</span>
            </div>
            <form onSubmit={handleOnSubmit}>
                <input
                    type="text"
                    id="search-navbar"
                    className="block w-full p-2 pl-10 text-sm text-gray-900 rounded-lg border-2 focus:ring-0 focus:outline-none focus:border-2 focus:border-indigo-700"
                    placeholder="Search..."
                    onChange={(e) =>
                        setQuery(
                            e.target.value
                                .trim()
                                .toLocaleLowerCase()
                                .split(" ")
                                .join("-")
                        )
                    }
                />
                <p className="text-center text-gray-800 pt-2">
                    Press ESC to cancel
                </p>
            </form>
        </div>
    );
}
